import { useNavbarContent } from '../utils/NavbarContentContext';

export default function NavbarContent() {
    const { navbarContent } = useNavbarContent();

    return (
        <div>
            {navbarContent || 'Nothing To Show Here'}
        </div>
    );
}
