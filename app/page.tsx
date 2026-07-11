import Quiz from '../components/Quiz';
import HeaderNav from '../components/TrustAndHeader';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderNav />
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Match with the Perfect Lender</h1>
        <Quiz onComplete={(data) => console.log(data)} />
      </div>
    </main>
  );
}