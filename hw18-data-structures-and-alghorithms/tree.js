class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
  
class BalancedBST {
    constructor() {
        this.root = null;
    }
  
    insert(data) { // it was done intentionally
        for (let i = 0; i < data.length - 1; i++) {
            if (!this.root) {
                this.root = new Node(data[i]);
                return;
            }
    
            const insertNode = (node, value) => {
                if (value < node.value) {
                    if (!node.left) {
                        node.left = new Node(value);
                    } else {
                        insertNode(node.left, value);
                    }
                } else if (value > node.value) {
                    if (!node.right) {
                        node.right = new Node(value);
                    } else {
                        insertNode(node.right, value);
                    }
                }

                // Update height
                node.height = 1 + Math.max(node.left ? node.left.height : 0, node.right ? node.right.height : 0);
        
                // Check for imbalance and rebalance
                return this.checkBalance(node);
            };
        
        
            insertNode(this.root, data[i]);
        }
    }
  
    checkBalance(node) {
        if (!node) {
            return null;
        }

        const balanceFactor = node.left ? node.left.height : 0 - (node.right ? node.right.height : 0);

        if (balanceFactor > 1) {
            if (node.left.left && node.left.left.height > node.left.right.height) {
                // Right rotation
                return this.rightRotate(node);
            } else {
                // Left-right rotation
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
        } else if (balanceFactor < -1) {
            if (node.right.right && node.right.right.height > node.right.left.height) {
                // Left rotation
                return this.leftRotate(node);
            } else {
                // Right-left rotation
                node.right = this.rightRotate(node.right);
                return this.leftRotate(node);
            }
        }

        return node;
    }

    rightRotate(node) {
        const temp = node.left;
        node.left = temp.right;
        temp.right = node;

        node.height = 1 + Math.max(node.left ? node.left.height : 0, node.right ? node.right.height : 0);
        temp.height = 1 + Math.max(temp.left ? temp.left.height : 0, temp.right ? temp.right.height : 0);
        
        return temp;
    }
    
    leftRotate(node) {
        const temp = node.right;
        node.right = temp.left;
        temp.left = node;
        
        node.height = 1 + Math.max(node.left ? node.left.height : 0, node.right ? node.right.height : 0);
        temp.height = 1 + Math.max(temp.left ? temp.left.height : 0, temp.right ? temp.right.height : 0);
        
        return temp;
    }

    find(value) {
        let current = this.root;

        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return current;
            }
        }

        return null;
    }
  

    delete(value) {
        const deleteNode = (node, value) => {
            if (!node) {
                return null;
            }

            if (value < node.value) {
                node.left = deleteNode(node.left, value);
            } else if (value > node.value) {
                node.right = deleteNode(node.right, value);
            } else {
                if (!node.left || !node.right) {
                    return node.left || node.right;
                }
        
                const successor = this.findMin(node.right);
                node.value = successor.value;
                node.right = deleteNode(node.right, successor.value);
            }
        
            // Update height
            node.height = 1 + Math.max(node.left ? node.left.height : 0, node.right ? node.right.height : 0);
        
            // Check for imbalance and rebalance
            return this.checkBalance(node);
        };
        
        this.root = deleteNode(this.root, value);
    }
    
    findMin(node) {
        if (!node.left) {
            return node;
        }

        return this.findMin(node.left);
    }    
}

module.exports = { 
    BalancedBST
}