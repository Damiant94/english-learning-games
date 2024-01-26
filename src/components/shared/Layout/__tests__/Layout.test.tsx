import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../Layout';


describe('Layout', () => {

    it('should have div with class .Layout', () => {
        const { container } = render(
            <Layout><></></Layout>
        );
        const divLayout = container.querySelector(".Layout");
        expect(divLayout).toBeInTheDocument();
    });
});