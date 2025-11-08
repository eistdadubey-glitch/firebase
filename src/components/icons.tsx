export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <div className="flex items-center gap-2" {...props}>
      <svg
        role="img"
        aria-label="VastraAI Logo"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.5 12.5C21.5 18.0228 17.0228 22.5 11.5 22.5C5.97715 22.5 1.5 18.0228 1.5 12.5C1.5 6.97715 5.97715 2.5 11.5 2.5C13.5 2.5 15.3571 3.11111 16.9286 4.16667M16.9286 4.16667L19 2M16.9286 4.16667L15.3571 6.33333"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12L8.5 8.5M12 12L15.5 15.5M12 12L15.5 8.5M12 12L8.5 15.5"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-headline text-2xl font-bold text-foreground">
        VastraAI
      </span>
    </div>
  );
  