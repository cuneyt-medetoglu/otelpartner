import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@otelpartner.local";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin123!";

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  if (existing) {
    console.log("Admin kullanıcı zaten var:", ADMIN_EMAIL);
    return;
  }

  const hashed = await hash(ADMIN_PASSWORD, 10);
  await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      password: hashed,
      role: "admin",
      status: "active",
    },
  });
  console.log("Admin oluşturuldu:", ADMIN_EMAIL);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
