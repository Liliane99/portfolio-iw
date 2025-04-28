import { NextResponse } from 'next/server';

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

export async function GET() {
  try {
    
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      throw new Error('Les variables d\'environnement ne sont pas correctement définies.');
    }

    
    const res = await fetch(AIRTABLE_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

   
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Erreur Airtable:', errorData);
      throw new Error(`Erreur de récupération des données depuis Airtable: ${errorData.error?.message || 'Inconnue'}`);
    }

    
    const data = await res.json();
    return NextResponse.json(data.records);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur dans l\'API route:', error.message);
    } else {
      console.error('Erreur dans l\'API route:', error);
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Une erreur inconnue est survenue' }, { status: 500 });
  }
}
