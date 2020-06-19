import { outdent } from 'outdent';

import { LintConfig } from '../../../config/config';

import { validateDocument } from '../../../validate';
import { parseYamlToDocument, replaceSourceWithRef } from '../../../__tests__/utils';

describe('OAS3 openapi-tags-alphabetical', () => {
  it('should report on tags object if not sorted alphabetically', async () => {
    const document = parseYamlToDocument(
      outdent`
          openapi: 3.0.0
          paths: {}
          tags:
            - name: b
            - name: a
        `,
      'foobar.yaml',
    );

    const results = await validateDocument({
      document,
      config: new LintConfig({ extends: [], rules: { 'openapi-tags-alphabetical': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`
      Array [
        Object {
          "location": Array [
            Object {
              "pointer": "#/tags/0",
              "reportOnKey": false,
              "source": "foobar.yaml",
            },
          ],
          "message": "The \\"tags\\" array should be in alphabetical order",
          "ruleId": "openapi-tags-alphabetical",
          "severity": "error",
        },
      ]
    `);
  });

  it('should not report on tags object if sorted alphabetically', async () => {
    const document = parseYamlToDocument(
      outdent`
      openapi: 3.0.0
      paths: {}
      tags:
        - name: a
        - name: b
        `,
      'foobar.yaml',
    );

    const results = await validateDocument({
      document,
      config: new LintConfig({ extends: [], rules: { 'openapi-tags-alphabetical': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`Array []`);
  });
});
