// backend/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import userRoutes from './routes/users';
import roleRoutes from './routes/roles';
import uploadRoutes from './routes/upload';
import diseaseRoutes from './routes/disease';
import statisticRoutes from './routes/statistics';
import ricevarietyRoutes from './routes/ricevariety';

import { seedRoles, seedDiseaseInformations, seedDeficiencySolutions, seedUsers, seedRegions, seedProvinces, seedRiceVariety, seedMorphology, seedStrength, seedWeaknesse } from './seed';
import { saveAnalysisResult } from './controllers/analysisController';
import { getStatisticsAll, updateDiseaseStatistic } from './controllers/statisticsController';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

//Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://barcelona-galaxy-liberty-per.trycloudflare.com"
  ],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

// ไว้เช็คว่าเรียกใช้ option ต่างๆ ผ่านมั้ย
app.use(morgan('[:method] :url :status - :response-time ms'));
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(`❌ Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
});

//Route ไว้ทดสอบว่า server รันได้มั้ย
app.get('/', (_req, res) => {
  res.send('🌾 Rice Disease API is running');
});

//Routes ต่างๆ
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/uploads', uploadRoutes);
app.use('/disease', diseaseRoutes);
app.use('/Statistic', statisticRoutes)
app.use('/RiceVariety', ricevarietyRoutes)

//เริ่มต้น server
async function startServer() {
  
  if (process.env.NODE_ENV === "test") {
    
    app.use((req, res, next) => {
      if (req.body && req.body.imageID) {
        res.locals.analysisData = req.body;
      }
      next();
    });

    app.post("/analysis/save", saveAnalysisResult);
    app.put("/Statistic", updateDiseaseStatistic);
    app.get("/Statistic", getStatisticsAll);
  }

  await seedRoles();
  await seedDiseaseInformations();
  await seedDeficiencySolutions();
  await seedUsers();
  await seedRegions();
  await seedProvinces();
  await seedRiceVariety();
  await seedMorphology();
  await seedStrength();
  await seedWeaknesse();

  if (require.main === module) {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  }
  
}

startServer();

export default app;