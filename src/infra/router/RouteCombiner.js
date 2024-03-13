import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "../../domain/authGuard/AuthGuard";

export const RouteCombiner = ({ routes }) => {
	const RoutesMap = routes.map(
		({
			auth = false,
			exact = true,
			Layout = ({ children }) => <>{children}</>,
			Component,
			path,
			nested,
		}) => {
			const ComponentWithLayout = () => {
				const Element = nested ? <RouteCombiner routes={nested} /> : <Component />;
				return !auth ? (
					<Layout>
						<Component />
					</Layout>
				) : (
                    <AuthGuard>
                        <Layout>
                            {Element}
                        </Layout>
                    </AuthGuard>
				);
			};
			return (
				<Route
					key={path}
					exact={exact}
					element={<ComponentWithLayout />}
					path={path}
				/>
			);
		}
	);
	return <Routes>{RoutesMap}</Routes>;
};
