const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/orgRoutes');
const orgMembers = require('./routes/orgMemberRoutes');
const projectRoutes = require('./routes/projectRoutes');
const statusRoutes = require('./routes/statusRoutes');
const issueRoutes = require('./routes/issuesRoutes');
const roleRoutes = require('./routes/roleRoutes')
const auditRoutes = require('./routes/auditLogsRoutes')

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/auth', authRoutes);
app.use('/org', orgRoutes);
app.use('/org-members', orgMembers);
app.use('/projects', projectRoutes);
app.use('/status', statusRoutes);
app.use('/issues', issueRoutes);
app.use('/roles', roleRoutes)
app.use('/audit', auditRoutes)

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`This app is running on localhost ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
