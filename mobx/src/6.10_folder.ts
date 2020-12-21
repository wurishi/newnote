import { autorun, configure, extendObservable, observable } from 'mobx';
import { createTransformer } from 'mobx-utils';

configure({ enforceActions: 'never' });

function Folder(parent, name) {
  this.parent = parent;
  extendObservable(this, {
    name,
    children: [],
  });
}

function DisplayFolder(folder, state) {
  this.state = state;
  this.folder = folder;
  extendObservable(this, {
    collapsed: false,
    get name() {
      return this.folder.name;
    },
    get isVisible() {
      return !this.state.filter || this.name.indexOf(this.state.filter) >= 0;
    },
    get children() {
      if (this.collapsed) {
        return [];
      }
      return this.folder.children
        .map(transformFolder)
        .filter((child) => child.isVisible);
    },
    get path() {
      return this.folder.parent === null
        ? this.name
        : transformFolder(this.folder.parent).path + '/' + this.name;
    },
  });
}

const state = observable({
  root: new Folder(null, 'root'),
  filter: null,
  displayRoot: null,
});

const transformFolder = createTransformer(
  (folder) => new DisplayFolder(folder, state)
);

const stringTransformer = createTransformer((displayFolder: any) => {
  const path = displayFolder.path;
  return (
    path +
    '\n' +
    displayFolder.children
      .filter((child) => child.isVisible)
      .map(stringTransformer)
      .join('')
  );
});

function createFolders(parent, recursion) {
  if (recursion === 0) {
    return;
  }
  for (let i = 0; i < 3; i++) {
    const folder = new Folder(parent, i + '');
    parent.children.push(folder);
    createFolders(folder, recursion - 1);
  }
}

createFolders(state.root, 2);

autorun(() => {
  state.displayRoot = transformFolder(state.root);
  const text = stringTransformer(state.displayRoot);
  console.log(text);
});

console.log('------------name change to wow');
state.root.name = 'wow';

console.log('------------collapsed children 1');
state.displayRoot.children[1].collapsed = true;

console.log('------------filter 2');
state.filter = '2';

console.log('------------no filter');
state.filter = null;
