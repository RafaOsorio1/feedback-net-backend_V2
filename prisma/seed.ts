import { PrismaClient, RequestStatus, RequestType, EmployeeRole, EmployeeStatus } from '@prisma/client';

// Extend the Prisma client with raw SQL methods
type ExtendedPrismaClient = PrismaClient & {
  $executeRawUnsafe: (query: string, ...values: any[]) => Promise<any>;
  $queryRawUnsafe: (query: string, ...values: any[]) => Promise<any>;
};
import * as bcrypt from 'bcryptjs';
import { generateReferenceNumber } from '../src/utils/referenceGenerator';

const prisma = new PrismaClient() as ExtendedPrismaClient;

// Helper function to get a random element from an array
const randomElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

// Generate random date within a range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

async function main() {
  console.log('🌱 Starting database seeding...');
  
  // Clear existing data (be careful with this in production!)
  console.log('🧹 Clearing existing data...');
  await prisma.analyticMetric.deleteMany({});
  await prisma.request.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.iSP.deleteMany({});

  // Helper function to hash passwords
  const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

  // Create ISPs
  console.log('🏢 Creating ISPs...');
  const isps = [];
  const ispNames = [
    'Internet Rápido S.A.', 
    'Conexión Total',
    'Red Veloz',
    'MegaNet',
    'Hiperconexión'
  ];

  for (let i = 0; i < ispNames.length; i++) {
    const isp = await prisma.iSP.create({
      data: {
        name: ispNames[i],
        email: `contacto@${ispNames[i].toLowerCase().replace(/\s+/g, '')}.com`,
        password: await hashPassword('password123'),
        logo: `https://example.com/logo${i + 1}.png`,
        contact: `Contacto ${i + 1}`,
        website: `https://${ispNames[i].toLowerCase().replace(/\s+/g, '')}.com`,
        primaryColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        secondaryColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        address: `Calle #${i + 1}, Ciudad`,
        phone: `+12345678${i.toString().padStart(2, '0')}`,
      },
    });
    isps.push(isp);
  }

  // Create employees
  console.log('👥 Creating employees...');
  const employees = [];
  const roles = [EmployeeRole.ADMIN, EmployeeRole.EMPLOYEE];
  const statuses = [EmployeeStatus.ACTIVE, EmployeeStatus.INACTIVE];

  for (let i = 0; i < 15; i++) {
    const isp = randomElement(isps);
    const role = i === 0 ? EmployeeRole.ADMIN : EmployeeRole.EMPLOYEE;
    
    const employee = await prisma.employee.create({
      data: {
        name: `Empleado ${i + 1}`,
        email: `empleado${i + 1}@${isp.name.toLowerCase().replace(/\s+/g, '')}.com`,
        password: await hashPassword('empleado123'),
        role,
        status: randomElement(statuses),
        ispId: isp.id,
      },
    });
    employees.push(employee);
  }

  // Create requests with different statuses and types
  console.log('📝 Creating requests...');
  const requestStatuses = [
    RequestStatus.PENDING, 
    RequestStatus.IN_PROGRESS, 
    RequestStatus.RESOLVED, 
    RequestStatus.CANCELED
  ];
  const requestTypes = [
    RequestType.PETITION,
    RequestType.COMPLAINT,
    RequestType.CLAIM,
    RequestType.SUGGESTION
  ];

  const firstNames = ['Carlos', 'Ana', 'Roberto', 'María', 'Juan', 'Laura', 'Pedro', 'Sofía', 'Diego', 'Valentina'];
  const lastNames = ['López', 'Martínez', 'Sánchez', 'González', 'Rodríguez', 'Fernández', 'Pérez', 'Gómez', 'Torres', 'Díaz'];
  const subjects = [
    'Problema con la conexión',
    'Soporte técnico requerido',
    'Consulta sobre facturación',
    'Sugerencia para mejorar el servicio',
    'Reclamo por servicio intermitente',
    'Solicitud de información',
    'Problema con el router',
    'Velocidad de internet lenta',
    'Corte de servicio',
    'Actualización de datos'
  ];

  const requests = [];
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  // Generate 100 random requests
  for (let i = 0; i < 100; i++) {
    const isp = randomElement(isps);
    const status = randomElement(requestStatuses);
    const type = randomElement(requestTypes);
    const employee = randomElement(employees.filter(e => e.ispId === isp.id));
    const createdAt = randomDate(oneYearAgo, now);
    const resolvedAt = status === RequestStatus.RESOLVED || status === RequestStatus.CANCELED 
      ? new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) // Resolved within a week
      : null;

    const request = await prisma.request.create({
      data: {
        referenceNumber: generateReferenceNumber(),
        fullName: `${randomElement(firstNames)} ${randomElement(lastNames)}`,
        phone: `+${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        address: `Calle ${Math.floor(Math.random() * 1000)}, Ciudad`,
        email: `user${i}@example.com`,
        subject: randomElement(subjects),
        details: `Detalles de la solicitud #${i + 1}. Esto es un texto de ejemplo para los detalles de la solicitud.`,
        type,
        status,
        createdAt,
        updatedAt: resolvedAt || createdAt,
        resolvedAt,
        ispId: isp.id,
        respondedById: Math.random() > 0.3 ? employee?.id : null, // 70% chance of having a responder
      },
    });
    requests.push(request);
  }

  // Generate analytic metrics for each ISP, period, and request type
  console.log('📊 Generating analytic metrics...');
  const periods = [
    new Date(2023, 0, 1), // January 2023
    new Date(2023, 1, 1), // February 2023
    new Date(2023, 2, 1), // March 2023
  ];

  for (const isp of isps) {
    for (const period of periods) {
      for (const type of Object.values(RequestType)) {
        const requestsForType = requests.filter(
          r => r.ispId === isp.id && 
               r.createdAt.getMonth() === period.getMonth() &&
               r.createdAt.getFullYear() === period.getFullYear() &&
               r.type === type
        );

        if (requestsForType.length > 0) {
          // Calculate response times for resolved/canceled requests
          let responseTimeSum = 0;
          let resolvedRequestCount = 0;
          
          const statusCounts = {
            [RequestStatus.PENDING]: 0,
            [RequestStatus.IN_PROGRESS]: 0,
            [RequestStatus.RESOLVED]: 0,
            [RequestStatus.CANCELED]: 0,
          };

          // Count requests by status and calculate response times
          requestsForType.forEach(request => {
            statusCounts[request.status]++;
            
            // Calculate response time for resolved/canceled requests
            if ((request.status === RequestStatus.RESOLVED || request.status === RequestStatus.CANCELED) && request.resolvedAt) {
              responseTimeSum += (request.resolvedAt.getTime() - request.createdAt.getTime()) / (1000 * 60 * 60); // in hours
              resolvedRequestCount++;
            }
          });
          
          // Calculate metrics
          const totalRequests = requestsForType.length;
          const closedRequests = statusCounts[RequestStatus.RESOLVED] + statusCounts[RequestStatus.CANCELED];
          const inProgressRequests = statusCounts[RequestStatus.IN_PROGRESS];
          const pendingRequests = statusCounts[RequestStatus.PENDING];
          const averageResponseTime = resolvedRequestCount > 0 ? responseTimeSum / resolvedRequestCount : null;
          
          try {
            // First, try to update existing record if it exists
            const updated = await prisma.$executeRawUnsafe(`
              UPDATE AnalyticMetric 
              SET 
                "totalRequests" = $1,
                "closedCount" = $2,
                "inProgressCount" = $3,
                "pendingCount" = $4,
                "avgResponseTime" = $5,
                "updatedAt" = NOW()
              WHERE "period" = $6 AND "type" = $7 AND "ispId" = $8
            `, 
            totalRequests, 
            closedRequests, 
            inProgressRequests, 
            pendingRequests, 
            averageResponseTime,
            period, 
            type, 
            isp.id);
            
            // If no rows were updated, insert a new record
            if (updated === 0) {
              await prisma.$executeRawUnsafe(`
                INSERT INTO "AnalyticMetric" (
                  "period", "type", "status", "totalRequests", "closedCount", 
                  "inProgressCount", "pendingCount", "avgResponseTime", "ispId",
                  "createdAt", "updatedAt"
                ) VALUES (
                  $1, $2, NULL, $3, $4, $5, $6, $7, $8, NOW(), NOW()
                )
              `, 
              period, 
              type, 
              totalRequests, 
              closedRequests, 
              inProgressRequests, 
              pendingRequests, 
              averageResponseTime, 
              isp.id);
            }
          } catch (error) {
            console.error('Error creating/updating analytic metric:', error);
            throw error;
          }
        }
      }
    }
  }

  console.log('✅ Database has been seeded with comprehensive test data!');
  console.log(`🌐 ${isps.length} ISPs created`);
  console.log(`👥 ${employees.length} employees created`);
  console.log(`📝 ${requests.length} requests created`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
