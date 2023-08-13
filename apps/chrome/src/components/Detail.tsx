import { useGetRepoDetail } from '@/hooks/repo';
import React from 'react';
import payload from './repo.json';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

const Detail = ({ owner, repoName }: { owner: string; repoName: string }) => {
    const { showDetail, loading, handleClick, repoDetail } = useGetRepoDetail({
        owner,
        repoName,
    });
    const repo = repoDetail && repoDetail.detail;

    const ButtonText = () => {
        let text = 'Show Details';
        if (!showDetail) {
            text = 'Show Details';
        } else if (loading) {
            text = 'Loading...';
        } else {
            text = 'Hide Details';
        }
        return <span>{text}</span>;
    };
    return (
        <div>
            <Button
                disabled={loading}
                variant="secondary"
                onClick={handleClick}
            >
                <ButtonText />
            </Button>
            {showDetail && repoDetail && (
                <Card className="w-[450px]">
                    <div>
                        <CardTitle className="text-3xl font-bold text-center mt-2">
                            Detail
                        </CardTitle>
                    </div>

                    <CardDescription className="text-center mt-4 mb-6">
                        A glance of your favorite repository.
                    </CardDescription>
                    <CardContent className="flex justify-between">
                        <div className="space-y-2">
                            <div className="text-muted-foreground text-sm">
                                Folders
                            </div>
                            <ScrollArea className="h-[400px] w-48 rounded-md border px-2 space-y-4">
                                {repo.tlf.folders.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="text-sm text-muted-foreground">
                                                📁 {item}
                                            </div>
                                        </div>
                                    );
                                })}
                            </ScrollArea>
                        </div>
                        <div className="space-y-2">
                            <div className="text-muted-foreground text-sm">
                                Files
                            </div>

                            <ScrollArea className="h-[400px] pb-6 w-48 rounded-md border px-2 space-y-4 overflow-y-scroll">
                                {repo.tlf.files.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="text-sm text-muted-foreground">
                                                📄 {item}
                                            </div>
                                        </div>
                                    );
                                })}
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Detail;
