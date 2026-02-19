/**
 * E-posta gönderimi.
 * Şu an gönderim yapılmıyor; uygulama içi bildirimler kullanılıyor.
 * İleride AWS SES veya başka bir sağlayıcı entegre edilebilir.
 */

export async function sendEmail(_params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: "E-posta gönderimi devre dışı" };
}
