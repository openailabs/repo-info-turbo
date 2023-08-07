import { db } from '@acme/db';
import { notFound } from 'next/navigation';

export async function userCanAccess(projectId: string) {
    if (!projectId.startsWith('project_')) {
        notFound();
    }

    // see if project exists
    const project = await db
        .selectFrom('Project')
        .select('id')
        .where('id', '=', projectId)
        .executeTakeFirst();

    if (!project) {
        notFound();
    }
}
