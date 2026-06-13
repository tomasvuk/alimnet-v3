import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import * as fs from 'fs';
import * as path from 'path';

const JSON_FILE_PATH = path.join(process.cwd(), 'src/lib/email-settings.json');

const getFallbackTemplates = () => {
  try {
    const data = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

export async function GET() {
  try {
    const adminClient = getAdminClient();
    const { data: dbTemplates, error } = await adminClient
      .from('email_templates')
      .select('*');

    if (error || !dbTemplates || dbTemplates.length === 0) {
      console.warn('DB email_templates table not found or empty, falling back to JSON file.');
      return NextResponse.json(getFallbackTemplates());
    }

    // Convert array to object key-value
    const templates: Record<string, { subject: string; body: string }> = {};
    dbTemplates.forEach(t => {
      templates[t.id] = { subject: t.subject, body: t.body };
    });
    return NextResponse.json(templates);
  } catch (err) {
    return NextResponse.json(getFallbackTemplates());
  }
}

export async function POST(req: Request) {
  try {
    const { id, subject, body } = await req.json();
    if (!id || !subject || !body) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 1. Try to save to Supabase
    let dbSuccess = false;
    try {
      const adminClient = getAdminClient();
      const { error } = await adminClient
        .from('email_templates')
        .upsert([{ id, subject, body, updated_at: new Date().toISOString() }]);
      
      if (!error) dbSuccess = true;
      else console.error('Error saving to Supabase:', error.message);
    } catch (err) {
      console.error('Failed database connection for email_templates:', err);
    }

    // 2. Try to save to file on disk
    let fileSuccess = false;
    try {
      const current = getFallbackTemplates();
      current[id] = { subject, body };
      fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(current, null, 2), 'utf-8');
      fileSuccess = true;
    } catch (err) {
      console.error('Failed to write email-settings.json to disk:', err);
    }

    if (!dbSuccess && !fileSuccess) {
      return NextResponse.json({ error: 'Failed to save template anywhere' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      savedToDb: dbSuccess,
      savedToFile: fileSuccess,
      message: dbSuccess ? 'Plantilla guardada en base de datos' : 'Plantilla guardada en archivo local'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
