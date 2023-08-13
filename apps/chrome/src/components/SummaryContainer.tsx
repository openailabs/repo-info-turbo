import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetSummary } from '@/hooks/repo';
import React from 'react';
import payload from './repo.json';
import { Button } from './ui/button';

const SummaryContainer = ({
    owner,
    repoName,
}: {
    owner: string;
    repoName: string;
}) => {
    const { handleSummaryClick, summary, loaded, loading } = useGetSummary({
        owner,
        repoName,
    });
    const data = summary && JSON.parse(summary);

    return (
        <div>
            <Button disabled={loading || loaded} onClick={handleSummaryClick}>
                Get Summary
            </Button>
            {loaded && (
                <Card className="w-full">
                    <CardTitle className="text-3xl font-bold text-center mt-2">
                        Summary
                    </CardTitle>
                    <CardDescription className="text-center mt-4 mb-6">
                        {data.description}
                    </CardDescription>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-muted-foreground">
                                    Deployments:
                                </div>
                                <div className="flex gap-2 items-center">
                                    {data.deployments.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <Badge>{item}</Badge>
                                            {index !==
                                            data.deployments.length - 1 ? (
                                                <Separator orientation="vertical" />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-lg flex gap-4 items-start">
                                <div className="text-muted-foreground text-sm capitalize">
                                    stacks:
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {data.stacks.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <Badge variant="outline">
                                                {item}
                                            </Badge>
                                            {index !==
                                            data.stacks.length - 1 ? (
                                                <Separator orientation="vertical" />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-lg flex gap-4 items-center">
                                <div className="text-muted-foreground text-sm capitalize">
                                    infrastructures:
                                </div>
                                <div className="flex gap-2 items-center">
                                    {data.infrastructures.map((item, index) => (
                                        <div
                                            key={index}
                                            //className="py-1 px-2 rounded text-sm border bg-blue-500 text-white border-gray-300"
                                        >
                                            <Badge variant="secondary">
                                                {item}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-lg flex gap-4 items-center">
                                <div className="text-muted-foreground text-sm capitalize">
                                    languages:
                                </div>
                                <div className="flex gap-2">
                                    {data.languages.map((item, index) => (
                                        <Badge
                                            key={index}
                                            variant="destructive"
                                            className="bg-blue-400"
                                        >
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SummaryContainer;
