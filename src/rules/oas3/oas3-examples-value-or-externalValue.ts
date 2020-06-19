import { OAS3Rule } from '../../visitors';

export const ExampleValueOrExternalValue: OAS3Rule = () => {
  return {
    Example(example, { report, location }) {
      if (example.value && example.externalValue) {
        report({
          message: 'Example object can have either "value" or "externalValue" fields.',
          location: { ...location.append(['value']), reportOnKey: true },
        });
      }
    },
  };
};
