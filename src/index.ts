import './index.css'

import * as B from "blockly";
import { blocks } from "./blocks";
import { generator } from "./generators";
import { toolbox } from "./toolbox";
import { read, write } from "./storage";

const codeDiv = document.getElementById('generatedCodeInner')!;
const workspace = B.inject('blocklyDiv', {toolbox});

const theme = workspace.getTheme();
theme.fontStyle.family = "monospace";
workspace.setTheme(theme);

B.common.defineBlocks(blocks);

function runCode() {
  const code = generator.workspaceToCode(workspace);
  codeDiv.innerText = code;
}
function load(obj: object) {
  B.Events.disable();
  try {
    B.serialization.workspaces.load(obj, workspace, { recordUndo: false });
  } catch (error) {
    alert(`load error: ${error}`)
  }
  B.Events.enable();
}
function loadFromStorage() {
  const text = read() || '{}';
  const obj = JSON.parse(text);
  load(obj);
}
function save() {
  const data = B.serialization.workspaces.save(workspace);
  return data;
}
function saveToStorage() {
  const obj = save();
  const text = JSON.stringify(obj);
  write(text)
}

loadFromStorage()
runCode()

workspace.addChangeListener(e => {
  if (e.isUiEvent
    || e.type == B.Events.FINISHED_LOADING
    || workspace.isDragging()
  ) return;

  runCode();
});
workspace.addChangeListener(e => {
  if (e.isUiEvent) return;
  saveToStorage();
});
