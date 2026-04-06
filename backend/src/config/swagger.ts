import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "StudyRats API",
      version: "1.0.0",
      description: "API de consistência acadêmica com prova visual de estudo",
    },
    servers: [{ url: "http://localhost:3333", description: "Desenvolvimento" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            avatarUrl: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Subject: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            color: { type: "string", example: "#7C3AED", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        StudySession: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            studyDate: { type: "string", format: "date" },
            durationMinutes: { type: "integer" },
            description: { type: "string", nullable: true },
            didExercises: { type: "boolean" },
            exerciseCount: { type: "integer", nullable: true },
            subject: { $ref: "#/components/schemas/Subject" },
            photos: {
              type: "array",
              items: { $ref: "#/components/schemas/Photo" },
            },
          },
        },
        Photo: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            imageUrl: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            message: { type: "string" },
            issues: { type: "object" },
          },
        },
        PeriodSummary: {
          type: "object",
          properties: {
            totalMinutes: { type: "integer" },
            totalHours: { type: "number" },
            sessionCount: { type: "integer" },
            studiedDays: { type: "integer" },
          },
        },
        CalendarDay: {
          type: "object",
          properties: {
            date: { type: "string", format: "date", example: "2026-04-06" },
            studied: { type: "boolean" },
            totalMinutes: { type: "integer" },
            sessionCount: { type: "integer" },
            mainSubject: {
              nullable: true,
              allOf: [{ $ref: "#/components/schemas/Subject" }],
            },
          },
        },
        SubjectRanking: {
          type: "object",
          properties: {
            rank: { type: "integer", example: 1 },
            subject: { $ref: "#/components/schemas/Subject" },
            totalMinutes: { type: "integer" },
            totalHours: { type: "number" },
            sessionCount: { type: "integer" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/modules/**/*.routes.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
