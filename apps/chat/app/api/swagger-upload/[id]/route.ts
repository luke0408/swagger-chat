import { readFile } from 'fs/promises';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'tmp', 'swagger-docs', `${context.params.id}.json`);

    const content = await readFile(filePath, 'utf-8');

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Swagger document not found' }, { status: 404 });
  }
}