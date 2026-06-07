/**
 * lib/seed.ts — Seeds the BUCC_EM database with realistic BUCC data.
 * Run with: npx tsx lib/seed.ts
 */

import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { MongoClient, ServerApiVersion } from "mongodb";
import bcrypt from "bcryptjs";

const uri =
  "mongodb+srv://sadeedahmed681_db_user:ATnktZalF2q2DJqA@cluster0.ldztwya.mongodb.net/BUCC_EM?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function seed() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("✅ Connected to MongoDB Atlas (BUCC_EM)");

  const db = client.db("BUCC_EM");

  // ── Drop existing collections for a clean seed ───────────────────────────
  const collections = [
    "semesters", "events", "members", "committees",
    "transactions", "sponsors", "vendors", "handoverNotes",
    "notifications", "auditLogs", "users",
  ];
  for (const col of collections) {
    await db.collection(col).drop().catch(() => {});
  }
  console.log("🗑️  Dropped existing collections");

  const now = new Date().toISOString();

  // ── Semesters ─────────────────────────────────────────────────────────────
  const semRes = await db.collection("semesters").insertMany([
    { name: "Spring 2027", year: 2027, status: "active",    startDate: "2027-01-15", endDate: "2027-05-15", president: "Sadeed Ahmed",  createdAt: now, updatedAt: now },
    { name: "Fall 2026",   year: 2026, status: "completed", startDate: "2026-08-01", endDate: "2026-12-15", president: "Arif Hossain",  createdAt: now, updatedAt: now },
    { name: "Spring 2026", year: 2026, status: "completed", startDate: "2026-01-15", endDate: "2026-05-15", president: "Nusrat Jahan",  createdAt: now, updatedAt: now },
    { name: "Fall 2025",   year: 2025, status: "completed", startDate: "2025-08-01", endDate: "2025-12-15", president: "Farhan Islam",  createdAt: now, updatedAt: now },
    { name: "Spring 2025", year: 2025, status: "completed", startDate: "2025-01-15", endDate: "2025-05-15", president: "Samia Akter",   createdAt: now, updatedAt: now },
  ]);
  const [sp27, fa26, sp26, fa25, sp25] = Object.values(semRes.insertedIds);
  console.log("✅ Seeded semesters");

  // ── Members ───────────────────────────────────────────────────────────────
  const memRes = await db.collection("members").insertMany([
    { name: "Sadeed Ahmed",   studentId: "22201001", email: "sadeed@g.bracu.ac.bd",  department: "CSE", batch: "Fall 2022",   role: "President",         status: "Active", semesterId: sp27.toString(), phone: "01711111101", createdAt: now, updatedAt: now },
    { name: "Nadia Rahman",   studentId: "22201045", email: "nadia@g.bracu.ac.bd",   department: "CSE", batch: "Fall 2022",   role: "Vice President",    status: "Active", semesterId: sp27.toString(), phone: "01711111102", createdAt: now, updatedAt: now },
    { name: "Rifat Hossain",  studentId: "22201089", email: "rifat@g.bracu.ac.bd",   department: "EEE", batch: "Spring 2023", role: "General Secretary", status: "Active", semesterId: sp27.toString(), phone: "01711111103", createdAt: now, updatedAt: now },
    { name: "Muna Khan",      studentId: "23101034", email: "muna@g.bracu.ac.bd",    department: "CSE", batch: "Spring 2023", role: "Treasurer",         status: "Active", semesterId: sp27.toString(), phone: "01711111104", createdAt: now, updatedAt: now },
    { name: "Tanvir Sarkar",  studentId: "23101067", email: "tanvir@g.bracu.ac.bd",  department: "CSE", batch: "Fall 2023",   role: "Director",          status: "Active", semesterId: sp27.toString(), phone: "01711111105", createdAt: now, updatedAt: now },
    { name: "Raisa Begum",    studentId: "23201011", email: "raisa@g.bracu.ac.bd",   department: "BBA", batch: "Fall 2023",   role: "Senior Executive",  status: "Active", semesterId: sp27.toString(), phone: "01711111106", createdAt: now, updatedAt: now },
    { name: "Imran Ali",      studentId: "24101023", email: "imran@g.bracu.ac.bd",   department: "CSE", batch: "Spring 2024", role: "Executive",         status: "Active", semesterId: sp27.toString(), phone: "01711111107", createdAt: now, updatedAt: now },
    { name: "Sultana Parvin", studentId: "24101056", email: "sultana@g.bracu.ac.bd", department: "CSE", batch: "Fall 2024",   role: "Executive",         status: "Active", semesterId: sp27.toString(), phone: "01711111108", createdAt: now, updatedAt: now },
    { name: "Kamal Uddin",    studentId: "24101078", email: "kamal@g.bracu.ac.bd",   department: "EEE", batch: "Fall 2024",   role: "Executive",         status: "Active", semesterId: sp27.toString(), phone: "01711111109", createdAt: now, updatedAt: now },
    { name: "Rima Akter",     studentId: "24201030", email: "rima@g.bracu.ac.bd",    department: "CSE", batch: "Spring 2024", role: "Panel Member",      status: "Active", semesterId: sp27.toString(), phone: "01711111110", createdAt: now, updatedAt: now },
    { name: "Arif Hossain",   studentId: "21201001", email: "arif@g.bracu.ac.bd",    department: "CSE", batch: "Fall 2021",   role: "Alumni Viewer",     status: "Alumni", semesterId: fa26.toString(), createdAt: now, updatedAt: now },
    { name: "Priya Das",      studentId: "21201045", email: "priya@g.bracu.ac.bd",   department: "CSE", batch: "Fall 2021",   role: "Alumni Viewer",     status: "Alumni", semesterId: fa26.toString(), createdAt: now, updatedAt: now },
    { name: "Nusrat Jahan",   studentId: "20201001", email: "nusrat@g.bracu.ac.bd",  department: "CSE", batch: "Spring 2020", role: "Alumni Viewer",     status: "Alumni", semesterId: sp26.toString(), createdAt: now, updatedAt: now },
  ]);
  const memberIds = Object.values(memRes.insertedIds);
  void memberIds; // used in future attendance features
  console.log("✅ Seeded members");

  // ── Events ────────────────────────────────────────────────────────────────
  await db.collection("events").insertMany([
    { semesterId: sp27.toString(), semesterName: "Spring 2027", eventName: "Tech Fest 2027",       eventType: "Competition", status: "Approved",  date: "2027-03-15", budget: 50000, expense: 0,     attendance: 0,   description: "Annual flagship tech competition",      venue: "SAC Auditorium", createdBy: "Sadeed Ahmed",  createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), semesterName: "Spring 2027", eventName: "Career Fair Spring",   eventType: "Career Fair", status: "Running",   date: "2027-03-22", budget: 45000, expense: 32000, attendance: 240, description: "Connect students with top companies",    venue: "Gymnasium",      createdBy: "Nadia Rahman",  createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), semesterName: "Spring 2027", eventName: "Python Bootcamp",      eventType: "Bootcamp",    status: "Submitted", date: "2027-04-05", budget: 15000, expense: 0,     attendance: 0,   description: "3-day intensive Python bootcamp",        venue: "CS Lab 301",     createdBy: "Rifat Hossain", createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), semesterName: "Spring 2027", eventName: "CS Networking Night",  eventType: "Networking",  status: "Draft",     date: "2027-04-18", budget: 8000,  expense: 0,     attendance: 0,   description: "Casual networking for CS students",      venue: "Faculty Lounge", createdBy: "Muna Khan",     createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), semesterName: "Spring 2027", eventName: "ML Workshop",          eventType: "Workshop",    status: "Completed", date: "2027-02-10", budget: 12000, expense: 11200, attendance: 85,  description: "Hands-on machine learning workshop",     venue: "CS Lab 201",     createdBy: "Tanvir Sarkar", createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), semesterName: "Spring 2027", eventName: "Freshers Orientation", eventType: "Recruitment", status: "Completed", date: "2027-01-20", budget: 20000, expense: 18500, attendance: 310, description: "Welcome event for new BUCC members",     venue: "SAC Auditorium", createdBy: "Sadeed Ahmed",  createdAt: now, updatedAt: now },
    { semesterId: fa26.toString(), semesterName: "Fall 2026",   eventName: "Tech Fest 2026",       eventType: "Competition", status: "Archived",  date: "2026-10-15", budget: 48000, expense: 45000, attendance: 800, description: "Largest Tech Fest in club history",     venue: "SAC Auditorium", createdBy: "Arif Hossain",  createdAt: now, updatedAt: now },
    { semesterId: fa26.toString(), semesterName: "Fall 2026",   eventName: "Career Fair Fall",     eventType: "Career Fair", status: "Archived",  date: "2026-11-10", budget: 40000, expense: 38000, attendance: 420, description: "Fall semester career fair",              venue: "Gymnasium",      createdBy: "Priya Das",     createdAt: now, updatedAt: now },
    { semesterId: sp26.toString(), semesterName: "Spring 2026", eventName: "BUCC Hackathon",       eventType: "Competition", status: "Archived",  date: "2026-03-20", budget: 35000, expense: 34000, attendance: 180, description: "24-hour hackathon challenge",             venue: "Engineering Lab",createdBy: "Nusrat Jahan",  createdAt: now, updatedAt: now },
    { semesterId: fa25.toString(), semesterName: "Fall 2025",   eventName: "Data Science Seminar", eventType: "Seminar",     status: "Archived",  date: "2025-10-05", budget: 18000, expense: 17500, attendance: 210, description: "Expert-led data science seminar",        venue: "SAC Room 101",   createdBy: "Farhan Islam",  createdAt: now, updatedAt: now },
    { semesterId: sp25.toString(), semesterName: "Spring 2025", eventName: "Cloud Workshop",       eventType: "Workshop",    status: "Archived",  date: "2025-03-12", budget: 14000, expense: 13800, attendance: 95,  description: "AWS & Azure cloud computing workshop",   venue: "CS Lab 102",     createdBy: "Samia Akter",   createdAt: now, updatedAt: now },
  ]);
  console.log("✅ Seeded events");

  // ── Committees ────────────────────────────────────────────────────────────
  await db.collection("committees").insertMany([
    { semesterId: sp27.toString(), semesterName: "Spring 2027", president: "Sadeed Ahmed",  vicePresident: "Nadia Rahman",  generalSecretary: "Rifat Hossain",  treasurer: "Muna Khan",     directors: ["Tanvir Sarkar", "Raisa Begum", "Imran Ali", "Sultana Parvin"],       createdAt: now, updatedAt: now },
    { semesterId: fa26.toString(), semesterName: "Fall 2026",   president: "Arif Hossain",  vicePresident: "Priya Das",     generalSecretary: "Kamrul Hassan",  treasurer: "Fatema Begum",  directors: ["Asif Rahman", "Lubna Chowdhury", "Masum Ahmed", "Tania Islam"],       createdAt: now, updatedAt: now },
    { semesterId: sp26.toString(), semesterName: "Spring 2026", president: "Nusrat Jahan",  vicePresident: "Rezaul Karim",  generalSecretary: "Shahida Begum",  treasurer: "Omar Faruq",    directors: ["Nasrin Akter", "Milon Hossain", "Shimu Roy", "Babu Mia"],             createdAt: now, updatedAt: now },
    { semesterId: fa25.toString(), semesterName: "Fall 2025",   president: "Farhan Islam",  vicePresident: "Rupa Begum",    generalSecretary: "Jahangir Alam",  treasurer: "Salma Khatun",  directors: ["Babul Akter", "Rina Begum", "Sohel Rana", "Mitu Das"],               createdAt: now, updatedAt: now },
    { semesterId: sp25.toString(), semesterName: "Spring 2025", president: "Samia Akter",   vicePresident: "Mahfuz Alam",   generalSecretary: "Dilruba Begum",  treasurer: "Iqbal Hossain", directors: ["Parvin Akter", "Kamal Das", "Shirin Akter", "Masud Rana"],           createdAt: now, updatedAt: now },
  ]);
  console.log("✅ Seeded committees");

  // ── Transactions ──────────────────────────────────────────────────────────
  await db.collection("transactions").insertMany([
    { semesterId: sp27.toString(), eventName: "Tech Fest 2027",    type: "Sponsorship",    amount: 75000, description: "TechCorp Bangladesh sponsorship",   date: "2027-03-10", createdBy: "Muna Khan",     createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), eventName: "Tech Fest 2027",    type: "Expense",        amount: 15000, description: "Venue booking — SAC Auditorium",    date: "2027-03-08", createdBy: "Muna Khan",     createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), eventName: "Career Fair",       type: "Purchase",       amount: 8500,  description: "Banner & printing",                 date: "2027-03-05", createdBy: "Rifat Hossain", createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), eventName: "General",           type: "Membership Fee", amount: 24000, description: "Spring 2027 membership fees",        date: "2027-02-28", createdBy: "Muna Khan",     createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), eventName: "ML Workshop",       type: "Expense",        amount: 5000,  description: "Speaker honorarium",                date: "2027-02-20", createdBy: "Tanvir Sarkar", createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), eventName: "Python Bootcamp",   type: "Income",         amount: 12000, description: "Registration fee income",           date: "2027-02-15", createdBy: "Muna Khan",     createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), eventName: "ML Workshop",       type: "Reimbursement",  amount: 3200,  description: "Equipment reimbursement",           date: "2027-02-10", createdBy: "Tanvir Sarkar", createdAt: now, updatedAt: now },
    { semesterId: sp27.toString(), eventName: "Freshers Orient.",  type: "Expense",        amount: 18500, description: "Freshers orientation total cost",    date: "2027-01-20", createdBy: "Sadeed Ahmed",  createdAt: now, updatedAt: now },
    { semesterId: fa26.toString(), eventName: "Tech Fest 2026",    type: "Sponsorship",    amount: 80000, description: "DataBridge Solutions sponsorship",   date: "2026-10-01", createdBy: "Fatema Begum",  createdAt: now, updatedAt: now },
    { semesterId: fa26.toString(), eventName: "Tech Fest 2026",    type: "Expense",        amount: 45000, description: "Tech Fest 2026 total expenses",      date: "2026-10-20", createdBy: "Fatema Begum",  createdAt: now, updatedAt: now },
    { semesterId: fa26.toString(), eventName: "Career Fair Fall",  type: "Sponsorship",    amount: 35000, description: "BracU Career Center sponsorship",    date: "2026-11-01", createdBy: "Fatema Begum",  createdAt: now, updatedAt: now },
    { semesterId: sp26.toString(), eventName: "BUCC Hackathon",    type: "Income",         amount: 20000, description: "Hackathon registration fees",        date: "2026-03-10", createdBy: "Omar Faruq",    createdAt: now, updatedAt: now },
  ]);
  console.log("✅ Seeded transactions");

  // ── Sponsors ──────────────────────────────────────────────────────────────
  await db.collection("sponsors").insertMany([
    { companyName: "TechCorp Bangladesh Ltd.", contactPerson: "Zahirul Islam",  phone: "01711234567", email: "zahir@techcorp.bd",     tier: "Platinum", sponsoredEvents: ["Tech Fest 2027","Tech Fest 2026","Career Fair Spring","Career Fair Fall","BUCC Hackathon"], totalValue: 250000, createdAt: now, updatedAt: now },
    { companyName: "DataBridge Solutions",     contactPerson: "Farida Yasmin",  phone: "01812345678", email: "farida@databridge.com", tier: "Gold",     sponsoredEvents: ["Tech Fest 2026","Career Fair Fall","Python Bootcamp"],                                   totalValue: 120000, createdAt: now, updatedAt: now },
    { companyName: "CodeNation Ltd.",          contactPerson: "Sabbir Ahmed",   phone: "01923456789", email: "sabbir@codenation.io",  tier: "Silver",   sponsoredEvents: ["ML Workshop","CS Networking Night"],                                                    totalValue: 60000,  createdAt: now, updatedAt: now },
    { companyName: "StartupBD Hub",           contactPerson: "Mehnaz Parvin",  phone: "01534567890", email: "mehnaz@startupbd.com",  tier: "Bronze",   sponsoredEvents: ["Freshers Orientation"],                                                                 totalValue: 25000,  createdAt: now, updatedAt: now },
    { companyName: "BracU Career Center",     contactPerson: "Dr. Zia Ahmed",  phone: "01611111111", email: "career@bracu.ac.bd",    tier: "Gold",     sponsoredEvents: ["Career Fair Spring","Career Fair Fall"],                                                totalValue: 100000, createdAt: now, updatedAt: now },
  ]);
  console.log("✅ Seeded sponsors");

  // ── Vendors ───────────────────────────────────────────────────────────────
  await db.collection("vendors").insertMany([
    { vendorName: "XYZ Print House",       category: "Printing",    contactPerson: "Rubel Mia",   phone: "01711000001", rating: 4.8, status: "Preferred", lastUsed: "Spring 2027", timesHired: 12, notes: "Fast delivery, quality banners",  createdAt: now, updatedAt: now },
    { vendorName: "Creative AV Solutions", category: "AV & Sound",  contactPerson: "Sumon Das",   phone: "01812000002", rating: 4.6, status: "Preferred", lastUsed: "Spring 2027", timesHired: 8,  notes: "Professional sound & projectors", createdAt: now, updatedAt: now },
    { vendorName: "FoodBox Catering",      category: "Catering",    contactPerson: "Ruma Begum",  phone: "01923000003", rating: 4.2, status: "Active",    lastUsed: "Fall 2026",   timesHired: 5,  notes: "Good value for large events",     createdAt: now, updatedAt: now },
    { vendorName: "EventCraft Decoration", category: "Decoration",  contactPerson: "Hasan Ali",   phone: "01534000004", rating: 4.5, status: "Active",    lastUsed: "Fall 2026",   timesHired: 7,  notes: "Creative setups on time",         createdAt: now, updatedAt: now },
    { vendorName: "Fast Courier BD",       category: "Courier",     contactPerson: "Karim Ahmed", phone: "01635000005", rating: 3.9, status: "Inactive",  lastUsed: "Spring 2026", timesHired: 3,  notes: "Delayed once — use backup",       createdAt: now, updatedAt: now },
    { vendorName: "ClickPhoto Studio",     category: "Photography", contactPerson: "Nayan Das",   phone: "01736000006", rating: 4.7, status: "Preferred", lastUsed: "Spring 2027", timesHired: 10, notes: "Excellent event photography",     createdAt: now, updatedAt: now },
  ]);
  console.log("✅ Seeded vendors");

  // ── Handover Notes ────────────────────────────────────────────────────────
  await db.collection("handoverNotes").insertMany([
    {
      semesterId: fa26.toString(), semesterName: "Fall 2026", eventName: "Tech Fest 2026", author: "Arif Hossain",
      problems: ["Venue confirmed only 5 days before — logistics stress", "AV vendor arrived 2 hours late", "Sponsor payment delayed 3 weeks"],
      recommendations: ["Confirm venue 3 weeks prior", "Have backup AV vendor ready", "Send invoice 1 month before event"],
      createdAt: now, updatedAt: now,
    },
    {
      semesterId: fa26.toString(), semesterName: "Fall 2026", eventName: "Career Fair Fall 2026", author: "Priya Das",
      problems: ["Only 12/20 companies attended (last-minute cancellations)", "Registration form technical issue for 2 hrs"],
      recommendations: ["Confirm company attendance 48hrs before with call", "Test form 1 week before opening", "Keep offline backup sheet"],
      createdAt: now, updatedAt: now,
    },
    {
      semesterId: sp26.toString(), semesterName: "Spring 2026", eventName: "Spring 2026 Semester Close", author: "Nusrat Jahan",
      problems: ["Financial report submitted 2 weeks late", "Handover docs incomplete for 2 departments"],
      recommendations: ["Set handover deadline 2 weeks before semester end", "Create standardized handover checklist"],
      createdAt: now, updatedAt: now,
    },
  ]);
  console.log("✅ Seeded handover notes");

  // ── Notifications ─────────────────────────────────────────────────────────
  await db.collection("notifications").insertMany([
    { type: "approval", title: "Event Approval Required",  body: "Tech Fest 2027 is awaiting your approval.",                          read: false, targetRole: "President",  createdAt: now },
    { type: "budget",   title: "Budget Approved",          body: "Career Fair budget of ৳45,000 has been approved.",                   read: false, targetRole: "all",        createdAt: now },
    { type: "event",    title: "New Event Submitted",      body: "Python Bootcamp has been submitted for review.",                     read: false, targetRole: "President",  createdAt: now },
    { type: "meeting",  title: "Meeting Reminder",         body: "Monthly committee meeting tomorrow at 5:00 PM — SAC Room 204",      read: true,  targetRole: "all",        createdAt: now },
    { type: "semester", title: "Semester Deadline",        body: "Spring 2027 ends in 68 days. Start planning semester close.",       read: true,  targetRole: "President",  createdAt: now },
    { type: "approval", title: "Vendor Invoice Pending",   body: "XYZ Print House invoice ৳8,500 needs Treasurer confirmation.",      read: true,  targetRole: "Treasurer",  createdAt: now },
    { type: "event",    title: "Event Completed",          body: "ML Workshop marked as Completed — 85 attendees.",                   read: true,  targetRole: "all",        createdAt: now },
    { type: "budget",   title: "Budget Alert",             body: "Career Fair expense has reached 71% of allocated budget.",          read: true,  targetRole: "Treasurer",  createdAt: now },
  ]);
  console.log("✅ Seeded notifications");

  // ── Audit Logs ────────────────────────────────────────────────────────────
  await db.collection("auditLogs").insertMany([
    { action: "System Seeded",     detail: "Database seeded with initial BUCC data",    performedBy: "seed-script",  risk: "low",    collection: "all",          createdAt: now },
    { action: "Created Semester",  detail: "Spring 2027 — Active",                     performedBy: "Sadeed Ahmed", risk: "low",    collection: "semesters",    createdAt: now },
    { action: "Added Member",      detail: "Sadeed Ahmed (22201001)",                   performedBy: "system",       risk: "low",    collection: "members",      createdAt: now },
    { action: "Created Event",     detail: "Tech Fest 2027",                           performedBy: "Sadeed Ahmed", risk: "low",    collection: "events",       createdAt: now },
    { action: "User Role Changed", detail: "Imran Ali: Executive → Director",          performedBy: "Sadeed Ahmed", risk: "high",   collection: "members",      createdAt: now },
    { action: "Modified Budget",   detail: "Career Fair: ৳40,000 → ৳45,000",          performedBy: "Muna Khan",    risk: "medium", collection: "transactions", createdAt: now },
  ]);
  console.log("✅ Seeded audit logs");

  // ── Users (for auth) ──────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("bucc2027!", 12);
  await db.collection("users").insertMany([
    { name: "Sadeed Ahmed", email: "sadeed@g.bracu.ac.bd", passwordHash, role: "Super Admin",   studentId: "22201001", semesterId: sp27.toString(), createdAt: now, updatedAt: now },
    { name: "Muna Khan",    email: "muna@g.bracu.ac.bd",   passwordHash, role: "Treasurer",     studentId: "23101034", semesterId: sp27.toString(), createdAt: now, updatedAt: now },
    { name: "Nadia Rahman", email: "nadia@g.bracu.ac.bd",  passwordHash, role: "Vice President",studentId: "22201045", semesterId: sp27.toString(), createdAt: now, updatedAt: now },
  ]);
  console.log("✅ Seeded users  (password: bucc2027!)");

  // ── Indexes ───────────────────────────────────────────────────────────────
  await db.collection("events").createIndex({ semesterId: 1, status: 1 });
  await db.collection("members").createIndex({ semesterId: 1, role: 1 });
  await db.collection("members").createIndex({ studentId: 1 });
  await db.collection("transactions").createIndex({ semesterId: 1, type: 1 });
  await db.collection("notifications").createIndex({ read: 1, createdAt: -1 });
  await db.collection("auditLogs").createIndex({ createdAt: -1 });
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  console.log("✅ Created indexes");

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log("\n🎉 Seed complete! Collections in BUCC_EM:");
  for (const col of collections) {
    const count = await db.collection(col).countDocuments();
    console.log(`   ${col.padEnd(20)} ${count} docs`);
  }

  await client.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message ?? err);
  process.exit(1);
});
