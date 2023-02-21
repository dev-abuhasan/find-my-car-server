import './env.js';
import 'colors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';

//db connection
import { errorHandler, notFound } from './server/services/middleware/error.js';
import connect_db from './server/services/config/db.js';

import userRoutes from './server/routes/user.routes.js';
import carRoutes from './server/routes/car.routes.js';
import searchRoutes from './server/routes/search.routes.js';
import bookmarkRoutes from './server/routes/bookmark-routes.js';
import uploadRoutes from './server/routes/upload.routes.js';

//db-connection
connect_db();

const app = express();
// Port
const port = process.env.PORT || 5000;

// Bypass cors
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

app.get('/', (req, res) => {
    res.send('Find My Car');
});

//Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/cars', carRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/bookmarks', bookmarkRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Log Server Connection
app.listen(port, () =>
    console.log(`Server running on port: ${port}`.yellow.bold)
);
