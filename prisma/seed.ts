import {
  EmployeeRole,
  EmployeeStatus,
  PrismaClient,
  RequestStatus,
  RequestType,
} from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { generateReferenceNumber } from "../src/utils/referenceGenerator";

const prisma = new PrismaClient();

// Helper function to get a random element from an array
const randomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

// Generate random date within a range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (be careful with this in production!)
  console.log("🧹 Clearing existing data...");
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
  console.log("🏢 Creating ISPs...");
  const isps = [];
  const ispNames = [
    "Internet Rápido S.A.",
    "Conexión Total",
    "Red Veloz",
    "MegaNet",
    "Hiperconexión",
  ];

  for (let i = 0; i < ispNames.length; i++) {
    const isp = await prisma.iSP.create({
      data: {
        name: ispNames[i],
        email: `contacto@${ispNames[i].toLowerCase().replace(/\s+/g, "")}.com`,
        password: await hashPassword("password123"),
        logo: `https://example.com/logo${i + 1}.png`,
        contact: `Contacto ${i + 1}`,
        website: `https://${ispNames[i].toLowerCase().replace(/\s+/g, "")}.com`,
        primaryColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        secondaryColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        address: `Calle #${i + 1}, Ciudad`,
        phone: `+12345678${i.toString().padStart(2, "0")}`,
      },
    });
    isps.push(isp);
  }

  // Create employees
  console.log("👥 Creating employees...");
  const employees = [];
  const roles = [EmployeeRole.ADMIN, EmployeeRole.EMPLOYEE];
  const statuses = [EmployeeStatus.ACTIVE, EmployeeStatus.INACTIVE];

  for (let i = 0; i < 15; i++) {
    const isp = randomElement(isps);
    const role = i === 0 ? EmployeeRole.ADMIN : EmployeeRole.EMPLOYEE;

    const employee = await prisma.employee.create({
      data: {
        name: `Empleado ${i + 1}`,
        email: `empleado${i + 1}@${isp.name.toLowerCase().replace(/\s+/g, "")}.com`,
        password: await hashPassword("empleado123"),
        role,
        status: randomElement(statuses),
        ispId: isp.id,
      },
    });
    employees.push(employee);
  }

  // Create requests with different statuses and types
  console.log("📝 Creating requests...");
  const requestStatuses = [
    RequestStatus.PENDING,
    RequestStatus.IN_PROGRESS,
    RequestStatus.RESOLVED,
    RequestStatus.CANCELED,
  ];
  const requestTypes = [
    RequestType.PETITION,
    RequestType.COMPLAINT,
    RequestType.CLAIM,
    RequestType.SUGGESTION,
  ];

  const firstNames = [
    "Carlos",
    "Ana",
    "Roberto",
    "María",
    "Juan",
    "Laura",
    "Pedro",
    "Sofía",
    "Diego",
    "Valentina",
  ];
  const lastNames = [
    "López",
    "Martínez",
    "Sánchez",
    "González",
    "Rodríguez",
    "Fernández",
    "Pérez",
    "Gómez",
    "Torres",
    "Díaz",
  ];
  const subjects = [
    "Problema con la conexión",
    "Soporte técnico requerido",
    "Consulta sobre facturación",
    "Sugerencia para mejorar el servicio",
    "Reclamo por servicio intermitente",
    "Solicitud de información",
    "Problema con el router",
    "Velocidad de internet lenta",
    "Corte de servicio",
    "Actualización de datos",
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
    const employee = randomElement(employees.filter((e) => e.ispId === isp.id));
    const createdAt = randomDate(oneYearAgo, now);
    const resolvedAt =
      status === RequestStatus.RESOLVED || status === RequestStatus.CANCELED
        ? new Date(
            createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000,
          ) // Resolved within a week
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
  console.log("📊 Generating analytic metrics...");
  const periods = [
    new Date(2023, 0, 1), // January 2023
    new Date(2023, 1, 1), // February 2023
    new Date(2023, 2, 1), // March 2023
  ];

  for (const isp of isps) {
    for (const period of periods) {
      for (const type of Object.values(RequestType)) {
        const requestsForType = requests.filter(
          (r) =>
            r.ispId === isp.id &&
            r.createdAt.getMonth() === period.getMonth() &&
            r.createdAt.getFullYear() === period.getFullYear() &&
            r.type === type,
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
          requestsForType.forEach((request) => {
            statusCounts[request.status]++;

            // Calculate response time for resolved/canceled requests
            if (
              (request.status === RequestStatus.RESOLVED ||
                request.status === RequestStatus.CANCELED) &&
              request.resolvedAt
            ) {
              responseTimeSum +=
                (request.resolvedAt.getTime() - request.createdAt.getTime()) /
                (1000 * 60 * 60); // in hours
              resolvedRequestCount++;
            }
          });

          // Calculate metrics
          const totalRequests = requestsForType.length;
          const closedRequests =
            statusCounts[RequestStatus.RESOLVED] +
            statusCounts[RequestStatus.CANCELED];
          const inProgressRequests = statusCounts[RequestStatus.IN_PROGRESS];
          const pendingRequests = statusCounts[RequestStatus.PENDING];
          const averageResponseTime =
            resolvedRequestCount > 0
              ? responseTimeSum / resolvedRequestCount
              : null;

          try {
            await prisma.analyticMetric.upsert({
              where: {
                period_type_ispId: {
                  period: period,
                  type: type,
                  ispId: isp.id as string,
                },
              },
              update: {
                totalRequests,
                closedCount: closedRequests,
                inProgressCount: inProgressRequests,
                pendingCount: pendingRequests,
                avgResponseTime: averageResponseTime,
                updatedAt: new Date(),
              },
              create: {
                period,
                type,
                totalRequests,
                closedCount: closedRequests,
                inProgressCount: inProgressRequests,
                pendingCount: pendingRequests,
                avgResponseTime: averageResponseTime,
                ispId: isp.id,
              },
            });
          } catch (error) {
            console.error("Error creating/updating analytic metric:", error);
            throw error;
          }
        }
      }
    }
  }

  // Generate responses for requests
  console.log("💬 Starting to generate responses...");
  const responseTemplates = [
    "Hemos recibido su solicitud y estamos trabajando en ella.",
    "Gracias por reportar este problema. Nuestro equipo lo está revisando.",
    "Hemos actualizado el estado de su solicitud.",
    "¿Podría proporcionar más detalles sobre su solicitud?",
    "Su solicitud ha sido resuelta satisfactoriamente.",
    "Lamentamos los inconvenientes ocasionados. Estamos trabajando en una solución.",
    "Hemos escalado su solicitud a nuestro equipo técnico.",
    "¿Podría confirmar si el problema persiste?",
    "Gracias por su paciencia mientras resolvemos su solicitud.",
    "Hemos implementado una solución para su problema.",
  ];

  let responseCount = 0;
  const requestCount = requests.length;
  let processedRequests = 0;

  for (const req of requests) {
    processedRequests++;
    console.log(
      `📝 Processing request ${processedRequests}/${requestCount} (${req.id})`,
    );

    // Skip some requests to have variation (10% of requests will have no responses)
    if (Math.random() < 0.1) {
      console.log(`   ⏩ Skipping request (no responses)`);
      continue;
    }

    // 1-3 responses per request
    const responsesForThisRequest = Math.floor(Math.random() * 3) + 1;
    const isp = isps.find((i) => i.id === req.ispId);
    const ispEmployees = employees.filter((e) => e.ispId === req.ispId);

    console.log(
      `   📨 Generating ${responsesForThisRequest} response(s) for request`,
    );

    for (let i = 0; i < responsesForThisRequest; i++) {
      const isEmployeeResponse = Math.random() > 0.3; // 70% chance of employee response
      const isFirstResponse = i === 0;

      // For the first response, make sure it's from the ISP if the request has a responder
      const responder =
        isFirstResponse && req.respondedById
          ? { type: "employee" as const, id: req.respondedById }
          : isEmployeeResponse && ispEmployees.length > 0
            ? { type: "employee" as const, id: randomElement(ispEmployees).id }
            : { type: "isp" as const, id: isp!.id };

      // Create response data
      const responseData = {
        content: randomElement(responseTemplates),
        requestId: req.id,
        createdAt: new Date(req.createdAt.getTime() + (i + 1) * 3600000), // 1 hour between responses
        employeeId: responder.type === "employee" ? responder.id : undefined,
        ispId: responder.type === "isp" ? responder.id : undefined,
      };

      try {
        // Create the response
        await prisma.response.create({
          data: responseData,
        });
        responseCount++;
        console.log(
          `   ✅ Created ${responder.type} response ${i + 1}/${responsesForThisRequest}`,
        );

        // If this is the first response to a PENDING request, update status to IN_PROGRESS
        if (isFirstResponse && req.status === RequestStatus.PENDING) {
          await prisma.request.update({
            where: { id: req.id },
            data: {
              status: RequestStatus.IN_PROGRESS,
              respondedById:
                responder.type === "employee" ? responder.id : null,
            },
          });
          console.log(`   🔄 Updated request status to IN_PROGRESS`);
        }

        // If this is the last response and the request is in progress, 50% chance to resolve it
        if (
          i === responsesForThisRequest - 1 &&
          req.status === RequestStatus.IN_PROGRESS &&
          Math.random() > 0.5
        ) {
          const newStatus =
            Math.random() > 0.1
              ? RequestStatus.RESOLVED
              : RequestStatus.CANCELED;
          await prisma.request.update({
            where: { id: req.id },
            data: {
              status: newStatus,
              resolvedAt: new Date(),
            },
          });
          console.log(`   ✅ Updated request status to ${newStatus}`);
        }
      } catch (error) {
        console.error(`   ❌ Error creating response:`, error);
      }
    }
  }

  console.log("✅ Database has been seeded with comprehensive test data!");
  console.log(`🌐 ${isps.length} ISPs created`);
  console.log(`👥 ${employees.length} employees created`);
  console.log(`📝 ${requests.length} requests created`);
  console.log(`💬 ${responseCount} responses created`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
