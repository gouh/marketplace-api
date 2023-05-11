export interface RouterInterface {
    /**
     * Get name of router
     * @return string
     */
    getName(): string;

    /**
     * Configure for some controller
     */
    configureRoutes(): void;
}