document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-member-form');
    const nameInput = document.getElementById('name');
    const parentInput = document.getElementById('parent');
    const treeContainer = document.getElementById('tree-container');

    let familyData = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const parentName = parentInput.value.trim();

        if (name) {
            addMember(name, parentName);
            nameInput.value = '';
            parentInput.value = '';
        }
    });

    function addMember(name, parentName) {
        const newNode = { name, children: [] };

        if (!parentName && familyData.length === 0) {
            familyData = [newNode];
        } else if (parentName) {
            const parentNode = findNode(familyData, parentName);
            if (parentNode) {
                if (!parentNode.children) {
                    parentNode.children = [];
                }
                parentNode.children.push(newNode);
            } else {
                alert(`Parent "${parentName}" not found!`);
                return;
            }
        } else if (familyData.length > 0) {
            alert('A parent must be specified for new members.');
            return;
        }

        renderTree();
    }

    function findNode(nodes, name) {
        const queue = [...nodes];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node.name === name) {
                return node;
            }
            if (node.children) {
                for (const child of node.children) {
                    queue.push(child);
                }
            }
        }
        return null;
    }

    function renderTree() {
        treeContainer.innerHTML = ''; // Clear the container

        if (familyData.length === 0) {
            return;
        }

        const margin = { top: 40, right: 20, bottom: 40, left: 20 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select(treeContainer).append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const root = d3.hierarchy(familyData[0]);
        const treeLayout = d3.tree().size([width, height]); // Use [width, height] for vertical layout
        const treeData = treeLayout(root);

        const nodes = treeData.descendants();
        const links = treeData.links();

        // Links
        svg.selectAll('.link')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d3.linkVertical() // Use vertical links
                .x(d => d.x)
                .y(d => d.y));

        // Nodes
        const node = svg.selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`); // Swap translate order

        node.append('circle')
            .attr('r', 10);

        node.append('text')
            .attr('dy', '.35em')
            .attr('y', d => d.children ? -25 : 25) // Position text above or below
            .style('text-anchor', 'middle') // Center text
            .text(d => d.data.name);
    }
});