import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Child {
  key: string;
  name: string;
  children?: Child[];
}

interface Parent {
  key: string;
  name: string;
  children?: Child[];
}

const TreeNode: React.FC<{ node: Parent | Child; onSelect: (node: Parent) => void }> = ({ node, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && node.children && node.children.length > 0) {
      onSelect(node as Parent);
    } else {
      onSelect(null);
    }
  };

  return (
    <div style={{ marginBottom: "5px" }}>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleToggle();
        }}
      >
        {node.children && node.key !== "_" && (
          <span
            style={{
              display: "inline-block",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "8px solid #333",
              marginRight: "5px",
              transform: isOpen ? "rotate(-90deg)" : "none",
            }}
          ></span>
        )}
        {node.name}
      </div>
      {node.children && isOpen && (
        <div style={{ paddingLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNode key={child.key} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView: React.FC<{ data: Parent[]; onSelect: (node: Parent) => void }> = ({ data, onSelect }) => {
  return (
    <div>
      {data.map((parent) => (
        <TreeNode key={parent.key} node={parent} onSelect={onSelect} />
      ))}
    </div>
  );
};

const RightPanel: React.FC<{ selectedNode: Parent | null }> = ({ selectedNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedChildren, setSortedChildren] = useState<Child[]>([]);
  useEffect(() => {
    if (selectedNode) {
      const childrenToDisplay = selectedNode.children || [];
      const filteredChildren = childrenToDisplay.filter((child) =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSortedChildren([...filteredChildren].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setSortedChildren([]);
    }
  }, [selectedNode, searchTerm]);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div style={{ marginLeft: '100px', fontSize: '20px' }}>
      {selectedNode && (
        <>
          <h2 style={{ marginBottom: '10px' }}>Дочерние элементы:</h2>
        
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            type="text"
            placeholder="Поиск по имени"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              position: 'fixed',
              // top: '20px',
              // left: '20px',
              width: '200px',
              color: 'white',
              '& .MuiOutlinedInput-root': {
                borderColor: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
          />

          <ul style={{ listStyle: 'none', padding: '0', marginTop: '100px' }}>
            {sortedChildren.map((child) => (
              <li key={child.key} style={{ marginBottom: '5px' }}>{child.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Parent | null>(null);

  const handleNodeSelect = (node: Parent) => {
    if (node.children && node.children.length > 0) {
      setSelectedNode(node);
    } else {
      setSelectedNode(null);
    }
  };

  const data: Parent[] = [
    {
      key: '_',
      name: 'root',
      children: [
        {
          key: '0',
          name: 'quidem molestiae enim',
          children: [
            {
              key: '0-1',
              name: 'sunt qui excepturi placeat culpa',
              children: [
                {
                  key: '0-1-0',
                  name: 'omnis laborum odio',
                },
                {
                  key: '0-1-1',
                  name: 'non esse culpa molestiae omnis sed optio',
                },
                {
                  key: '0-1-2',
                  name: 'molestiae voluptate non',
                },
                {
                  key: '0-1-3',
                  name: 'eaque aut omnis a',
                },
                {
                  key: '0-1-4',
                  name: 'tenetur explicabo ea',
                },
                {
                  key: '0-1-5',
                  name: 'temporibus molestiae aut',
                }
              ],
            },
            {
              key: '0-2',
              name: 'natus impedit quibusdam illo est',
              children: [],
            },
          ],
        },
        {
          key: '1',
          name: 'quibusdam autem aliquid et et quia',
          children: [],
        },
        {
          key: '2',
          name: 'qui fuga est a eum',
          children: [
            {
              key: '2-0',
              name: 'saepe unde necessitatibus rem',
              children: [
                {
                  key: '2-0-0',
                  name: 'est placeat dicta ut nisi rerum iste',
                  children: [
                    {
                      key: '2-0-0-0',
                      name: 'ea voluptates maiores eos accusantium officiis tempore mollitia consequatur',
                    },
                    {
                      key: '2-0-0-1',
                      name: 'tenetur explicabo ea',
                    }
                  ],
                },
              ],
            },
            {
              key: '2-1',
              name: 'distinctio laborum qui',
            },
            {
              key: '2-2',
              name: 'quam nostrum impedit mollitia quod et dolor',
            },
            {
              key: '2-3',
              name: 'consequatur autem doloribus natus consectetur',
            },
          ],
        },
        {
          key: '3',
          name: 'ab rerum non rerum consequatur ut ea unde',
          children: [],
        },
        {
          key: '4',
          name: 'ducimus molestias eos animi atque nihil',
          children: [],
        },
        {
          key: '5',
          name: 'ut pariatur rerum ipsum natus repellendus praesentium',
          children: [],
        }
      ],
    },
  ];

  return (
    <div style={{ display: "flex", fontSize: '20px' }}>
      <div>
        <h2>Родительские элементы:</h2>
        <TreeView data={data} onSelect={handleNodeSelect} />
      </div>
      {selectedNode && <RightPanel selectedNode={selectedNode} />}
    </div>
  );
};

export default App;
