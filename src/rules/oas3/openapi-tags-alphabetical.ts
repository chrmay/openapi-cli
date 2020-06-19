import { OAS3Rule } from '../../visitors';

export const OpenapiTagsAlphabetical: OAS3Rule = () => {
  return {
    DefinitionRoot(root, { report, location }) {
      if (!root.tags) return;
      for (let i = 0; i < root.tags.length - 1; i++) {
        if (root.tags[i].name > root.tags[i + 1].name) {
          report({
            message: 'The "tags" array should be in alphabetical order',
            location: location.append(['tags', i]),
          });
        }
      }
    },
  };
};
