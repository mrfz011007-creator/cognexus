const out=document.getElementById("out");
const lines=[];
const log=(label,value)=>lines.push(label+": "+(typeof value==="string"?value:JSON.stringify(value,null,2)));
const show=()=>{out.textContent=lines.join("\n\n");};

async function loadJSON(path){
  const response=await fetch(path);
  if(!response.ok) throw new Error("HTTP "+response.status+" "+response.statusText+" for "+path);
  return response.json();
}

function scanRefs(value,found=[]){
  if(Array.isArray(value)){ for(const item of value) scanRefs(item,found); return found; }
  if(value&&typeof value==="object"){
    if(typeof value.$ref==="string") found.push(value.$ref);
    for(const [key,item] of Object.entries(value)){
      if(key!=="$ref") scanRefs(item,found);
    }
  }
  return found;
}

function cognexusSchemaPolicy(schema){
  const declared=schema?.$schema;
  const refs=scanRefs(schema);
  const remote=refs.filter(ref=>/^(https?:|ftp:|\/\/)/i.test(ref));
  return {
    exactDraft07:declared==="http://json-schema.org/draft-07/schema#",
    remoteRefsRejected:remote.length===0,
    refs
  };
}

async function run(){
  let Validator;
  const importStart=performance.now();
  try{
    const mod=await import("./vendor/cfworker-json-schema/dist/esm/index.js");
    Validator=mod.Validator;
    log("LOCAL LIBRARY IMPORT","SUCCESS");
    log("LOCAL LIBRARY IMPORT TIME",(performance.now()-importStart).toFixed(3)+" ms");
  }catch(e){
    log("LOCAL LIBRARY IMPORT","FAILED");
    log("ERROR",String(e?.stack||e));
    show();
    return;
  }

  const meta=await loadJSON("./vendor/metaschema/draft-07/schema.json");
  const validator=new Validator(meta,"2019-09");

  const validSchema={"$schema":"http://json-schema.org/draft-07/schema#","type":"string"};
  const invalidSchema={"$schema":"http://json-schema.org/draft-07/schema#","type":"strng"};

  log("DRAFT-07 METASCHEMA VALID",
    "schema:\n"+JSON.stringify(validSchema,null,2)+"\n\nresult: "+JSON.stringify(validator.validate(validSchema)));
  log("DRAFT-07 METASCHEMA INVALID",
    "schema:\n"+JSON.stringify(invalidSchema,null,2)+"\n\nresult: "+JSON.stringify(validator.validate(invalidSchema)));

  const nestedCases=[
    ["NESTED TYPE",{"type":"object","properties":{"id":{"type":"strng"}}}],
    ["NESTED REQUIRED",{"type":"object","properties":{"a":{"properties":{"b":{"required":"x"}}}}}],
    ["NESTED ARRAY ITEMS",{"type":"array","items":{"type":"strng"}}]
  ];
  for(const [name,schema] of nestedCases){
    log(name,"schema:\n"+JSON.stringify(schema,null,2)+"\n\nresult: "+JSON.stringify(validator.validate(schema)));
  }

  const entity={
    "$schema":"http://json-schema.org/draft-07/schema#",
    "$id":"cognexus:ref/entity",
    "definitions":{
      "entityId":{"type":"string","minLength":1}
    },
    "type":"object",
    "required":["id"],
    "properties":{"id":{"$ref":"#/definitions/entityId"}}
  };
  const workflow={
    "$schema":"http://json-schema.org/draft-07/schema#",
    "$id":"cognexus:ref/workflow",
    "definitions":{
      "entityRef":{"$ref":"cognexus:ref/entity"}
    },
    "type":"object",
    "required":["source"],
    "properties":{"source":{"$ref":"cognexus:ref/entity"}}
  };
  try{
    const cross=new Validator(entity,"2019-09");
    cross.addSchema(workflow,workflow.$id);
    const good={"source":{"id":"capture-1"}};
    const bad={"source":{"id":123}};
    log("D040 CROSS-KIND $ref",
      "entity schema:\n"+JSON.stringify(entity,null,2)+
      "\n\nworkflow schema:\n"+JSON.stringify(workflow,null,2)+
      "\n\ngood data result: "+JSON.stringify(cross.validate(good))+
      "\n\nbad data result: "+JSON.stringify(cross.validate(bad)));
  }catch(e){
    log("D040 CROSS-KIND $ref ERROR",String(e?.stack||e));
  }

  const policyGood={"$schema":"http://json-schema.org/draft-07/schema#","type":"object"};
  const policyRemote={"$schema":"http://json-schema.org/draft-07/schema#","$ref":"https://example.invalid/schema.json"};
  const exactPolicy=cognexusSchemaPolicy(policyGood);
  const remotePolicy=cognexusSchemaPolicy(policyRemote);
  log("COGNEXUS POLICY EXACT DRAFT-07",
    JSON.stringify(exactPolicy)+"\nstartup decision: "+(exactPolicy.exactDraft07?"PASS":"FAIL"));
  log("COGNEXUS POLICY REMOTE $ref",
    JSON.stringify(remotePolicy)+"\nstartup decision: "+(remotePolicy.remoteRefsRejected?"PASS":"FAIL"));

  const t0=performance.now();
  const perfValidator=new Validator(meta,"2019-09");
  const perfResult=perfValidator.validate(validSchema);
  const elapsed=performance.now()-t0;
  log("PERFORMANCE","load+validation validator setup: "+elapsed.toFixed(3)+" ms\nresult: "+JSON.stringify(perfResult));

  log("OFFLINE NOTE","All runtime imports/data above use localhost-relative files. Disable internet on the Android device before opening this page to verify true offline behavior.");
  log("DONE","Round 4 tests completed");
  show();
}

run().catch(e=>{log("FATAL ERROR",String(e?.stack||e));show();});
