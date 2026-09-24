# D039 Validator Spike

Temporary browser-only spike. This branch is isolated from `main`; do not merge this file into production.

## Library

`@cfworker/json-schema@4.1.1`

Loaded directly as an ES module from jsDelivr:

`https://cdn.jsdelivr.net/npm/@cfworker/json-schema@4.1.1/dist/esm/index.js`

## DynamicRef test schema

The test intentionally expects `{ "child": 123 }` to be invalid. The root schema declares a dynamic anchor named `node` with `type: "object"`; `child` uses `$dynamicRef: "#node"`.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$dynamicAnchor": "node",
  "type": "object",
  "properties": {
    "child": {
      "$dynamicRef": "#node"
    }
  },
  "additionalProperties": false
}
```

Test data:

```json
{
  "child": 123
}
```

If `$dynamicRef` is ignored, the child has no effective schema and the data may incorrectly validate.

## Other tests

The page also tests:

1. Invalid keyword: `type: "strng"` against the official 2020-12 metaschema.
2. A schema declaring draft-07 while the Validator is configured for 2020-12.
3. An unregistered remote `$ref`.
4. Official 2020-12 metaschema plus its vocabulary schemas:
   - core
   - applicator
   - unevaluated
   - validation
   - meta-data
   - format-annotation
   - content
5. Official draft-07 metaschema with the same valid/invalid schema pair.

The metaschema files are fetched by the Android browser at runtime. If CORS or another network restriction prevents loading them, the exact error is printed on screen.

## Run on Android

From this branch:

```bash
python -m http.server 8001
```

Open:

`http://localhost:8001/spikes/d039-validator/`

Copy the complete output shown on the page.

## Important

This is a spike only. No production code, `main`, or Cognexus runtime architecture is changed by this branch.

## Round 4: offline / CSP / runtime checks

Round 4 keeps all changes on this spike branch.

### Prepare local vendor files

This download is intentionally separate from the browser test. It is the only network-dependent setup step.

**Warning:** the command below downloads and extracts the library package and one JSON metaschema. It should normally finish quickly, but it does require internet access.

Run from the repository root:

```bash
cd ~/cognexus-spike
rm -rf spikes/d039-validator/vendor
mkdir -p spikes/d039-validator/vendor/cfworker-json-schema/dist spikes/d039-validator/vendor/metaschema
curl --fail --location --max-time 30 "https://registry.npmjs.org/@cfworker/json-schema/-/json-schema-4.1.1.tgz" -o /tmp/cfworker-json-schema-4.1.1.tgz
rm -rf /tmp/cfworker-json-schema-package
mkdir /tmp/cfworker-json-schema-package
tar -xzf /tmp/cfworker-json-schema-4.1.1.tgz -C /tmp/cfworker-json-schema-package
cp -R /tmp/cfworker-json-schema-package/package/dist/esm spikes/d039-validator/vendor/cfworker-json-schema/dist/
curl --fail --location --max-time 30 "https://json-schema.org/draft-07/schema" -o spikes/d039-validator/vendor/metaschema/schema.json
```

After that, the browser test uses only ./vendor/... paths. Turn off internet on the phone before opening the page.

### Dynamic-code inspection

After the library is present:

```bash
cd ~/cognexus-spike
grep -rnE 'eval\(|new Function|fetch\(' spikes/d039-validator/vendor/cfworker-json-schema/dist/esm
```

Paste the output exactly as shown. An empty result is meaningful.

### Run

```bash
cd ~/cognexus-spike
python -m http.server 8001
```

Open:

`http://localhost:8001/spikes/d039-validator/`

The page uses a strict `script-src 'self'` CSP and an external `test.js`, so an inline-script failure cannot mask the library result.

The output measures:
- local ES-module import time;
- draft-07 metaschema validation;
- nested schema validation;
- a mini cross-kind local `$ref` experiment (D040 observation only);
- Cognexus-side exact draft-07 and remote-`$ref` startup policy checks;
- validator setup + one validation timing.

Do not treat the D040 experiment as an architecture decision.