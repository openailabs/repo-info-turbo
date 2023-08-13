import { useGetMark, useUpsertMark } from '@/hooks/mark';
import { trpc } from '@/utils/trpc';
import React, { useEffect, useState } from 'react';
import payload from './repo.json';
import TagInput from './TagInput';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';

const Tags = ({ savedTags, setNewTags }) => {
    return (
        <div className="flex flex-col">
            <div className="text-sm text-muted-foreground">Tags:</div>
            {savedTags && (
                <TagInput setNewTags={setNewTags} savedTags={savedTags} />
            )}
        </div>
    );
};

const Note = ({
    savedNote,
    setNewNote,
}: {
    setNewNote: (note: string) => void;
    savedNote: string;
}) => {
    const [note, setNote] = useState(savedNote ?? '');
    // useEffect(() => {
    //     setNote(savedNote ?? '');
    // }, [savedNote]);
    // useEffect(() => {
    //     setNewNote(note);
    // }, [note]);
    return (
        <div className="flex flex-col items-start w-96">
            <div className="text-sm text-muted-foreground mb-2">Note:</div>

            <Textarea
                placeholder="Take a note..."
                value={note}
                onChange={(e) => {
                    setNote(e.target.value);
                    setNewNote(e.target.value);
                }}
            />
        </div>
    );
};

const Mark = ({
    owner,
    repoName,
    enabled,
}: {
    owner: string;
    repoName: string;
    enabled: boolean;
}) => {
    const { mark } = useGetMark({ owner, repoName, enabled });

    const [savedId, setSavedId] = useState('');
    const [tags, setTags] = useState([]);
    const [note, setNote] = useState('');
    const [newTags, setNewTags] = useState([]);
    const [newNote, setNewNote] = useState('');
    useEffect(() => {
        enabled && mark && mark.tags && setTags(mark.tags);
        enabled && mark && mark.note && setNote(mark.note);
    }, [mark, enabled, tags, note]);
    // const tags = enabled && mark && mark.tags;
    // const savedNote = enabled && mark && mark.savedNote;
    // if (mark.message === 'NotFound') return <div>no mark found</div>;
    const noteMutation = trpc.mark.saveMark.useMutation();
    console.log('mark', mark);
    console.log('newTags', newTags);
    const testTags = { ...mark?.tags, ...newTags };
    console.log('Test tags: ', testTags);

    return (
        <>
            {enabled && (
                <Card className="w-full">
                    <CardTitle className="text-3xl font-bold text-center mt-2">
                        Mark
                    </CardTitle>
                    <CardDescription className="text-center mt-4 mb-6">
                        Keep your notes and mark your tags.
                    </CardDescription>
                    <CardContent className="space-y-4">
                        <Tags savedTags={tags} setNewTags={setNewTags} />
                        <Note savedNote={note} setNewNote={setNewNote} />
                        <Button
                            onClick={() =>
                                noteMutation.mutate(
                                    {
                                        owner,
                                        name: repoName,
                                        id: mark?.id ?? '',
                                        note: note ?? newNote,
                                        tags: [...tags, ...newTags],
                                        // tags: [{ id: '1', text: 'test1' }],
                                    },
                                    {
                                        onError: (e) => {
                                            console.log('error', e);
                                        },
                                        onSuccess: (item) => {
                                            setSavedId(item?.id);
                                            console.log('success');
                                        },
                                    }
                                )
                            }
                            type="button"
                        >
                            Save
                        </Button>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default Mark;
