import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Parse .env.local
const envFile = fs.readFileSync(".env.local", "utf-8");
const env = {};
const lines = envFile.split(/\r?\n/);
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx !== -1) {
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    env[key] = val;
  }
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const adminEmail = process.argv[2] || "info@onp-bd.com";
const adminPassword = process.argv[3] || "Admin123456!";
const adminName = process.argv[4] || "Administrator";

async function main() {
  console.log(`Creating Admin user: ${adminEmail}...`);

  // 1. Check if user already exists
  const { data: userList } = await supabase.auth.admin.listUsers();
  const existingUser = userList?.users?.find((u) => u.email === adminEmail);

  let userId = existingUser?.id;

  if (!userId) {
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { name: adminName, role: "admin" },
    });

    if (createError || !newUser?.user) {
      console.error("Failed to create auth user:", createError?.message);
      process.exit(1);
    }
    userId = newUser.user.id;
    console.log("Auth user created with ID:", userId);
  } else {
    console.log("Auth user already exists with ID:", userId);
  }

  // 2. Insert or update profile in public.profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .upsert({
      user_id: userId,
      name: adminName,
      email: adminEmail,
      role: "admin",
      status: "active",
    }, { onConflict: "user_id" })
    .select()
    .single();

  if (profileError) {
    console.error("Failed to create profile:", profileError.message);
    process.exit(1);
  }

  console.log("Admin profile provisioned successfully:", profile);
  console.log("\nYou can now log in at /admin/login with:");
  console.log("Email:", adminEmail);
  console.log("Password:", adminPassword);
}

main().catch(console.error);
