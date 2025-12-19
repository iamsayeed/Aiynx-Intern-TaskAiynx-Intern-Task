import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { PanelLeft, Settings, Ghost, LayoutGrid } from 'lucide-react';
import { useStore, useActions } from '@/store/useStore';

interface MainLayoutProps {
    children: ReactNode;
    rightPanel: ReactNode;
}

export function MainLayout({ children, rightPanel }: MainLayoutProps) {
    const isMobilePanelOpen = useStore((state) => state.isMobilePanelOpen);
    const { setMobilePanelOpen } = useActions();

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden text-foreground relative">
            {/* Left Rail */}
            <aside className="w-16 flex-shrink-0 border-r bg-muted/40 flex flex-col items-center py-4 gap-4 z-20">
                <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    AG
                </div>
                <nav className="flex flex-col gap-2 mt-4">
                    <NavItem icon={<LayoutGrid size={20} />} active />
                    <NavItem icon={<PanelLeft size={20} />} />
                    <NavItem icon={<Settings size={20} />} />
                </nav>
                <div className="mt-auto">
                    <NavItem icon={<Ghost size={20} />} />
                </div>
            </aside>

            <div className="flex flex-col flex-1 min-w-0">
                {/* Top Bar */}
                <header className="h-14 border-b flex items-center px-4 justify-between bg-background z-10">
                    <h1 className="font-semibold text-lg flex items-center gap-2">
                        App Graph Builder
                    </h1>
                    <div className="flex items-center gap-2">
                        <button
                            className="lg:hidden p-2 -mr-2"
                            onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
                        >
                            <PanelLeft size={20} />
                        </button>
                        <div className="size-8 rounded-full bg-muted border" />
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 relative overflow-hidden">
                    {children}

                    {/* Right Panel (Desktop) */}
                    <div className="hidden lg:block absolute top-0 right-0 h-full w-80 border-l bg-background shadow-sm z-10">
                        {rightPanel}
                    </div>
                </main>
            </div>

            {/* Mobile Drawer */}
            <div
                className={cn(
                    "lg:hidden fixed inset-y-0 right-0 w-80 bg-background border-l z-50 transform transition-transform duration-300 ease-in-out shadow-2xl",
                    isMobilePanelOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {rightPanel}
            </div>

            {/* Overlay for mobile drawer */}
            {isMobilePanelOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    onClick={() => setMobilePanelOpen(false)}
                />
            )}
        </div>
    );
}

function NavItem({ icon, active }: { icon: ReactNode; active?: boolean }) {
    return (
        <button
            className={cn(
                "p-2 rounded-md transition-colors",
                active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            {icon}
        </button>
    );
}
