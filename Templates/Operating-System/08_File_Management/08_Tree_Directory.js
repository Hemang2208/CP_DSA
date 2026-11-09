// Topic: Tree-Structured Directory
// Concept: Directories can contain files and subdirectories, forming a tree. Absolute paths
// describe a location from the root, and relative paths start from the current directory.
// Use: Modern hierarchical file systems such as ext4 and NTFS.
// Time: O(depth) per path lookup. Space: O(total nodes).

class TreeNode {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.children = new Map();
    }
}

const root = new TreeNode("/", "dir");

function mkdir(parent, name) {
    const node = new TreeNode(name, "dir");
    parent.children.set(name, node);
    return node;
}

function touch(parent, name, content) {
    parent.children.set(name, { name, type: "file", content });
}

function resolve(path) {
    const parts = path.split("/").filter(Boolean);
    let node = root;

    for (const part of parts) {
        if (!node.children.has(part)) return null;
        node = node.children.get(part);
    }

    return node;
}

function printTree(node, prefix = "") {
    for (const child of node.children.values()) {
        console.log(`${prefix}${child.type === "dir" ? "[D]" : "[F]"} ${child.name}`);
        if (child.type === "dir") printTree(child, prefix + "  ");
    }
}

console.log("Tree-Structured Directory");
const home = mkdir(root, "home");
const user = mkdir(home, "user");
const docs = mkdir(user, "docs");
touch(user, "notes.txt", "hello");
touch(docs, "os.txt", "scheduling");

printTree(root);
console.log("\nResolve /home/user/docs/os.txt:", resolve("/home/user/docs/os.txt").content);
console.log("Resolve /home/user/missing.txt:", resolve("/home/user/missing.txt"));
