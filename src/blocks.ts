import * as B from 'blockly';

export const blocks = B.common.createBlockDefinitionsFromJsonArray([
  {
    type: 'BasicBlock',
    message0: 'BasicBlock %1',
    args0: [
      { type: 'field_input', name: 'arg', text: 'text' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 250,
  },
]);
