'use client';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Task,TaskPriority,TaskStatus} from '@/types';
import {addTask,editTask,deleteTask,fetchTasks} from "@/services/taskService"
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogActions,
} from '@mui/material';

const initialTasksStatus:TaskStatus[]=[
  {id:1,status:"Pending"},
  {id:2,status:"In Progress"},
  {id:3,status:"Completed"}
]
const initialTasksPriority:TaskPriority[]=[
  {id:1,priority:"Low"},
  {id:2,priority:"Normal"},
  {id:3,priority:"High"}
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [taskStatus, setTaskStatus] = useState<{ [key: number]: string }>({});
  const [taskPriority, setTaskPriority] = useState<{[key:number]:string}>({});


 const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.creationDate && task.creationDate.includes(searchQuery)) ||
    (task.completionDate && task.completionDate.includes(searchQuery)) ||
    taskPriority[task.priority_id]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    taskStatus[task.status_id]?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      if (selected.length === 0) {
        alert("No tasks selected for deletion.");
        return;
      }
      await deleteTask(selected);
      
      setTasks((prev) => prev.filter((task) => !selected.includes(task.id)));
      setSelected([]);
    } catch (error) {
      alert("Failed to delete selected tasks.");
      console.error("Error deleting tasks:", error);
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await deleteTask([id]); 
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      alert("Failed to delete selected tasks.");
      console.error("Error deleting tasks:", error);
    }    
  };

  const handleChangeTitle = (value:string) => {
    setEditingTask((prev) => ({ ...prev!, title: value }));
  };
  const handleChangeDescription = (value:string) => {
    setEditingTask((prev) => ({ ...prev!, description: value }));
  };
  const handleChangePriority = (value:number) => {
    setEditingTask((prev) => ({ ...prev!, priority_id: value }));
  };
  const handleChangeStatus = (value:number) => {
    setEditingTask((prev) => ({ ...prev!, status_id: value }));
  };

  const handleSave = async() => {
    if (!editingTask) return;
    if (editingTask.id === -1) {
      try {
        await addTask({
          title: editingTask.title,
          description: editingTask.description,
          priority_id: editingTask.priority_id,
          status_id: editingTask.status_id
        });
        const newTask = { ...editingTask, id: Date.now() };
        setTasks((prev) => [...prev, newTask]);
      } catch (error) {
        alert("Failed to add task.");
        console.error("Error adding task:", error);
      }

    } else {
      try {
        await editTask({
          id: editingTask.id,
          title: editingTask.title,
          description: editingTask.description,
          priority_id: editingTask.priority_id,
          status_id: editingTask.status_id
        });
        setTasks((prev) =>
          prev.map((task) => (task.id === editingTask.id ? editingTask : task))
        );
    } catch (error) {
      alert("Failed to edit task.");
      console.error("Error editing task:", error);
    }

    }
    setDialogOpen(false);
    setEditingTask(null);
  };

  const openEditDialog = (task?: Task) => {

    if (task) {
      setEditingTask(task);
    } else {
      setEditingTask({
        id: -1,
        title: '',
        creationDate: new Date().toISOString(),
        completionDate: null,
        description: '',
        priority_id: 1,
        status_id: 1,
      });
    }
    setDialogOpen(true);
  };
  useEffect(() => {

    const fetchData = async () => {
      try{
            const response = await fetchTasks();
            setTasks(response.res.tasks);

            const statusMap: { [key: number]: string } = {};
            initialTasksStatus.forEach((taskstatus) => {
              statusMap[taskstatus.id] = taskstatus.status;
            });

            setTaskStatus(statusMap);

            const priorityMap: { [key: number]: string } = {};
            initialTasksPriority.forEach((taskPriority) => {
              priorityMap[taskPriority.id] = taskPriority.priority;
            });
            setTaskPriority(priorityMap);
        
      }catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchData();
  }, []);
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
                <TableCell>{taskPriority[task.priority_id]}</TableCell>
                <TableCell>{taskStatus[task.status_id]}</TableCell>
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

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingTask?.id ? 'Edit Task' : 'Add Task'}</DialogTitle>
              <DialogContent>
                {/* title Input */}
                <TextField
                  margin="dense"
                  label="Title"
                  fullWidth
                  value={editingTask?.title || ''}
                  onChange={(e) => handleChangeTitle(e.target.value)}
                />
                {/* description Input */}
                <TextField
                  margin="dense"
                  label="Description"
                  fullWidth
                  value={editingTask?.description || ''}
                  onChange={(e) => handleChangeDescription(e.target.value)}
                />

                {/* Priority Dropdown */}
                <FormControl fullWidth margin="dense">
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={editingTask?.priority_id || ''}
                    label="Priority"
                    onChange={(e) => handleChangePriority(e.target.value)}
                  >
                    {initialTasksPriority.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.priority}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Status Dropdown */}
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={editingTask?.status_id || ''}
                    label="Status"
                    onChange={(e) =>handleChangeStatus(e.target.value)}
                  >
                    {initialTasksStatus.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)} color="inherit">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {handleSave()}}
                    variant="contained"
                    color="primary"
                  >
                    {editingTask?.id && editingTask.id !== -1 ? "Update" : "Save"}
                  </Button>
                </DialogActions>
            </Dialog>
        </div>
    </>);
}
