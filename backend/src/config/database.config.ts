export const databaseConfig = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'juangallardo',
  password: 'postgres',
  database: 'invoice_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
} 