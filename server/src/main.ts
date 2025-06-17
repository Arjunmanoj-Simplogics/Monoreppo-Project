import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Global error handling
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('Global error:', err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error',
      statusCode: err.status || 500,
    });
  });

  await app.listen(3001);
  console.log('Server is running on http://localhost:3001');
}
bootstrap(); 