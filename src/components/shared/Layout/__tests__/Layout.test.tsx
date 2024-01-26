import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../Layout';


describe('Layout', () => {

    it('should have div with test-id layout', () => {
        render(
            <Layout><></></Layout>
        );
        const divLayout = screen.getByTestId("layout");
        expect(divLayout).toBeInTheDocument();
    });
});