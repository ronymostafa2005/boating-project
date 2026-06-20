import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, boatType, capacity, marina } = body;

    if (!name || !email || !phone || !boatType || !capacity || !marina) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const contactEmail = process.env.CONTACT_EMAIL || "contact@boating.sa";

    if (resend) {
      await resend.emails.send({
        from: "Boating.sa <noreply@boating.sa>",
        to: contactEmail,
        subject: `List Boat Request: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nBoat Type: ${boatType}\nCapacity: ${capacity}\nMarina: ${marina}`,
      });
    } else {
      console.log("List boat submission:", body);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
