import { outdent } from 'outdent';

import { LintConfig } from '../../../config/config';

import { validateDocument } from '../../../validate';
import { parseYamlToDocument, replaceSourceWithRef } from '../../../__tests__/utils';

describe('OAS3 oas3-server-trailing-slash', () => {
  it('oas3-server-trailing-slash: should report on server object with trailing slash', async () => {
    const document = parseYamlToDocument(
      outdent`
          openapi: 3.0.0
          servers:
            - url: https://somedomain.com/
        `,
      'foobar.yaml',
    );

    const results = await validateDocument({
      document,
      config: new LintConfig({ extends: [], rules: { 'server-trailing-slash': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`
      Array [
        Object {
          "location": Array [
            Object {
              "pointer": "#/servers/0/url",
              "reportOnKey": false,
              "source": "foobar.yaml",
            },
          ],
          "message": "Server URL should not have a trailing slash.",
          "ruleId": "server-trailing-slash",
          "severity": "error",
        },
      ]
    `);
  });

  it('oas3-server-trailing-slash: should not report on server object with no trailing slash', async () => {
    const document = parseYamlToDocument(
      outdent`
          openapi: 3.0.0
          servers:
            - url: https://somedomain.com
        `,
      'foobar.yaml',
    );

    const results = await validateDocument({
      document,
      config: new LintConfig({ extends: [], rules: { 'server-trailing-slash': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`Array []`);
  });
});
