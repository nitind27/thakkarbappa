import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    const { sup_contact, sup_password } = await request.json();

    if (!sup_contact || !sup_password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    const supervisor = await prisma.supervisor.findFirst({
      where: { sup_contact },
    });

    if (!supervisor) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(sup_password, supervisor.sup_password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Ensure supervisor has an id property
    if (!supervisor.sup_id) {
      return NextResponse.json({ message: 'Supervisor ID not found' }, { status: 500 });
    }

    // Ensure JWT_SECRET is defined
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = sign({ id: supervisor.sup_id }, JWT_SECRET, { expiresIn: '1h' });
    
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, { httpOnly: true });

    return response;
    
  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json({ message: 'An error occurred during authentication' }, { status: 500 });
  }
}