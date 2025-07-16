'use client';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Task} from '@/types';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';


const initialTasks: Task[] = [
  {
    id: 1,
    title: 'create task page',
    creationDate: '2025-07-15 17:05:06',
    completionDate: null,
    priority: 'normal',
    status: 'In Progress',
  },
    {
    id: 2,
    title: 'modify dashboard page',
    creationDate: '2025-07-15 17:05:06',
    completionDate: null,
    priority: 'normal',
    status: 'Pending',
  },
    {
    id: 3,
    title: 'documentation update',
    creationDate: '2025-07-15 17:05:06',
    completionDate: null,
    priority: 'normal',
    status: 'Pending',
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selected, setSelected] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

 const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.creationDate && task.creationDate.includes(searchQuery)) ||
    (task.completionDate && task.completionDate.includes(searchQuery)) ||
    task.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    // delete selected tasks function will declared in app/services/taskService.ts
    setTasks((prev) => prev.filter((task) => !selected.includes(task.id)));
    setSelected([]);
  };

  const handleDelete = (id: number) => {
    // delete selected tasks function will declared in app/services/taskService.ts
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSave = () => {
    if (!editingTask) return;
    if (editingTask.id === 0) {
      // add new tasks function will declared in app/services/taskService.ts
      // Add new task
      const newTask = { ...editingTask, id: Date.now() };
      setTasks((prev) => [...prev, newTask]);
    } else {
      // edit existing task function will declared in app/services/taskService.ts
      // Update
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? editingTask : task))
      );
    }
    setDialogOpen(false);
    setEditingTask(null);
  };

  const openEditDialog = (task?: Task) => {
    if (task) {
      setEditingTask(task);
    } else {
      setEditingTask({
        id: 0,
        title: '',
        creationDate: new Date().toISOString(),
        completionDate: null,
        priority: 'normal',
        status: 'In Progress',
      });
    }
    setDialogOpen(true);
  };

  return (
    <>
    <TextField
        label="Search Tasks"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{
            mb: 2,
            px:3 ,
            py:3,
            backgroundColor: 'white',
            borderRadius: 5,
            boxShadow: 1,
        }}
        InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
            ),
        }}
        />
        <div style={{ padding: 20,backgroundColor:"white",borderRadius:8 }}>
        <h1>Tasks</h1>
        <Button variant="contained" onClick={() => openEditDialog()} sx={{ mb: 2 }}>
            Add Task
        </Button>
        {selected.length > 0 && (
            <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteSelected}
            sx={{ mb: 2, ml: 2 }}
            >
            Delete Selected ({selected.length})
            </Button>
        )}
        <Table>
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>Title</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Completion Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                <TableCell>
                    <Checkbox
                    checked={selected.includes(task.id)}
                    onChange={() => handleSelect(task.id)}
                    />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.creationDate}</TableCell>
                <TableCell>{task.completionDate || 'N/A'}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                    <Button size="small" onClick={() => openEditDialog(task)}>
                    Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(task.id)}>
                    Delete
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

        {/* Dialog for Add/Edit */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingTask?.id ? 'Edit Task' : 'Add Task'}</DialogTitle>
            <DialogContent>
            <TextField
                margin="dense"
                label="Title"
                fullWidth
                value={editingTask?.title || ''}
                onChange={(e) =>
                setEditingTask((prev) => ({ ...prev!, title: e.target.value }))
                }
            />
            <TextField
                margin="dense"
                label="Priority"
                fullWidth
                value={editingTask?.priority || ''}
                onChange={(e) =>
                setEditingTask((prev) => ({ ...prev!, priority: e.target.value }))
                }
            />
            <TextField
                margin="dense"
                label="Status"
                fullWidth
                value={editingTask?.status || ''}
                onChange={(e) =>
                setEditingTask((prev) => ({ ...prev!, status: e.target.value }))
                }
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    </>);
}
