import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST( request ) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('fi-sender-firstName')?.toString().trim() || '';
    const lastName = formData.get('fi-sender-lastName')?.toString().trim() || '';
    const email = formData.get('fi-sender-email')?.toString().trim() || '';
    const phone = formData.get('fi-text-phone')?.toString().trim() || '';
    const ville = formData.get('fi-radio-ville')?.toString() || '';
    const categorie = formData.get('fi-radio-categorie')?.toString() || '';
    const message = formData.get('fi-text-message')?.toString().trim() || '';
    const file = formData.get('fi-file-pictures[]');

    const recipients = [
      process.env.NOTIF_EMAIL_RECIPIENT_1,
      process.env.NOTIF_EMAIL_RECIPIENT_2,
    ].filter(Boolean);

    const attachments = [];
    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer.toString('base64'),
      });
    }

    const text = [
      `Prénom: ${firstName}`,
      `Nom: ${lastName}`,
      `Email: ${email}`,
      `Téléphone: ${phone}`,
      `Ville: ${ville}`,
      `Catégorie: ${categorie}`,
      `Message: ${message}`,
    ].join('\n');

    const subject = `Nouvelle demande de contact - ${firstName} ${lastName} - ${categorie} - ${ville}`;

    await Promise.all(
      recipients.map((to) =>
        resend.emails.send({
          from: "contact@tattoo-piercing-studio.fr",
          to: recipients,
          subject: `Nouvelle demande de contact - ${firstName} ${lastName} - ${categorie} - ${ville}`,
          html:`
            <p><strong>Prénom :</strong> ${firstName}</p>
            <p><strong>Nom :</strong> ${lastName}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Ville :</strong> ${ville}</p>
            <p><strong>Catégorie :</strong> ${categorie}</p>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
          `,
          attachments: attachments,
        })
      )
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error?.message || 'Une erreur est survenue.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
