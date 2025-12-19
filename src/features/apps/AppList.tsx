import { useApps } from '@/hooks/useQueries';
import { useStore, useActions } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AppList() {
    const { data: apps, isLoading, isError } = useApps();
    const selectedAppId = useStore((state) => state.selectedAppId);
    const { setSelectedAppId } = useActions();

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-muted-foreground" /></div>;
    }

    if (isError) {
        return <div className="p-4 text-red-500">Failed to load apps</div>;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Applications</h2>
                <p className="text-xs text-muted-foreground">Select an app to view its graph</p>
            </div>
            <div className="flex-1 overflow-auto p-2 space-y-2">
                {apps?.map((app) => (
                    <div
                        key={app.id}
                        onClick={() => setSelectedAppId(app.id)}
                        className={cn(
                            "p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 flex flex-col gap-2",
                            selectedAppId === app.id ? "bg-primary/5 border-primary shadow-sm" : "bg-card"
                        )}
                    >
                        <div className="flex justify-between items-start">
                            <span className="font-medium text-sm">{app.name}</span>
                            <Badge variant={app.status === 'healthy' ? 'default' : 'destructive'} className={cn(
                                "text-[10px] px-1.5 py-0",
                                app.status === 'healthy' && "bg-green-500 hover:bg-green-600",
                                app.status === 'degraded' && "bg-yellow-500 hover:bg-yellow-600",
                                app.status === 'down' && "bg-red-500 hover:bg-red-600"
                            )}>
                                {app.status}
                            </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground flex justify-between">
                            <span>{app.region}</span>
                            <span className="font-mono text-[10px] opacity-70">{app.id}</span>
                        </div>
                    </div>
                ))}
                {apps?.length === 0 && <div className="p-4 text-center text-sm text-muted-foreground">No apps found</div>}
            </div>
        </div>
    );
}
