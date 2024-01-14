import { InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
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
  const [sortMethod, setSortMethod] = useState<string>("alphabetical");

  const sortAlphabetically = (children: Child[]) => {
    return [...children].sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortByLength = (children: Child[]) => {
    return [...children].sort((a, b) => a.name.length - b.name.length);
  };

  const sortReverseAlphabetically = (children: Child[]) => {
    return [...children].sort((a, b) => b.name.localeCompare(a.name));
  };

  useEffect(() => {
    if (selectedNode) {
      const childrenToDisplay = selectedNode.children || [];
      const filteredChildren = childrenToDisplay.filter((child) =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      let sorted;

      switch (sortMethod) {
        case "alphabetical":
          sorted = sortAlphabetically(filteredChildren);
          break;
        case "length":
          sorted = sortByLength(filteredChildren);
          break;
        case "reverseAlphabetical":
          sorted = sortReverseAlphabetically(filteredChildren);
          break;
        default:
          sorted = filteredChildren;
      }

      setSortedChildren(sorted);
    } else {
      setSortedChildren([]);
    }
  }, [selectedNode, searchTerm, sortMethod]);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortMethod(event.target.value as string);
  };

  return (
    <div style={{ marginLeft: '100px', fontSize: '20px', display: 'flex' }}>
      {selectedNode && (
        <>
          <div style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputLabel id="sort-label">Сортировать по:</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-select"
                value={sortMethod}
                onChange={handleSortChange}
                style={{ color: 'white', marginLeft: '10px' }}
              >
                <MenuItem value="alphabetical">Алфавиту</MenuItem>
                <MenuItem value="length">Количеству символов</MenuItem>
                <MenuItem value="reverseAlphabetical">Обратному алфавиту</MenuItem>
              </Select>
              <TextField
                id="outlined-basic"
                label="Поиск"
                variant="outlined"
                type="text"
                placeholder="Поиск по имени"
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  marginLeft: '10px',
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
            </div>
            <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px' }}>
              {sortedChildren.map((child) => (
                <li key={child.key} style={{ marginBottom: '5px' }}>{child.name}</li>
              ))}
            </ul>
          </div>
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
    <>
    
        <Typography
          marginBottom={2}
          variant="h6"
          sx={{
            position: 'sticky',
            marginTop: '40px',
            top: '0',
            zIndex: '1',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2e3b55',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          Информация о сервисах
        </Typography>
    <div style={{ display: "flex", fontSize: '20px', marginTop: '20px' }}>
      <div>
        <TreeView data={data} onSelect={handleNodeSelect} />
      </div>
      {selectedNode && <RightPanel selectedNode={selectedNode} />}
    </div>
          </>
  );
};

export default App;
