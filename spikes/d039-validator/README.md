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
