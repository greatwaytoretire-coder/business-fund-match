import Quiz from '../../components/Quiz';
import HeaderNav from '../../components/TrustAndHeader';

export default async function GenericSEORoute({ params }: { params: { seoSlug: string } }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderNav />
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Funding Guide for {params.seoSlug}</h1>
        <Quiz />
      </div>
    </main>
  );
}