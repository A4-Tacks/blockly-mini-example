import * as B from 'blockly';

export const generator = new B.Generator('custom');

generator.scrub_ = function(block, code, thisOnly?) {
  const nextBlock = block.nextConnection?.targetBlock();

  if (nextBlock && !thisOnly) {
    return code + '\n' + generator.blockToCode(nextBlock);
  }

  return code
}
generator.forBlock['BasicBlock'] = function(block, _generator) {
  const arg = block.getField('arg')!;
  return `BasicBlock: ${arg.getText()}`
}
