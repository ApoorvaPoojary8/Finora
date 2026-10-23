import {
  Wallet,
  LayoutDashboard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  PiggyBank,
  Target,
  Settings,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Transactions", icon: ArrowLeftRight },
  { name: "Analytics", icon: ChartNoAxesCombined },
  { name: "Budgets", icon: PiggyBank },
  { name: "Savings Goals", icon: Target },

];

function SummaryCard({ title, amount, description, icon: Icon, theme }) {
  const styles = {
    canyon: {
      card: "bg-[#DF6D41] text-white",
      icon: "bg-white/15 text-white",
      detail: "text-white/75",
    },
    olive: {
      card: "bg-[#AAA648] text-white",
      icon: "bg-white/20 text-white",
      detail: "text-white/80",
    },
    sky: {
      card: "bg-[#8DA6CC] text-white",
      icon: "bg-white/20 text-white",
      detail: "text-white/85",
    },
  };

  const colors = styles[theme];

  return (
    <div className={`rounded-3xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${colors.card}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <h3 className="mt-4 text-3xl font-extrabold tracking-tight">
            {amount}
          </h3>
        </div>

        <div className={`rounded-2xl p-3 ${colors.icon}`}>
          <Icon size={23} />
        </div>
      </div>

      <p className={`mt-5 text-sm ${colors.detail}`}>{description}</p>
    </div>
  );
}

const recentTransactions = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Income",
    date: "Oct 22, 2026",
    amount: 45000,
    type: "income",
  },
  {
    id: 2,
    title: "Grocery Shopping",
    category: "Food",
    date: "Oct 21, 2026",
    amount: 1250,
    type: "expense",
  },
  {
    id: 3,
    title: "Electricity Bill",
    category: "Utilities",
    date: "Oct 20, 2026",
    amount: 850,
    type: "expense",
  },
  {
    id: 4,
    title: "Movie Tickets",
    category: "Entertainment",
    date: "Oct 19, 2026",
    amount: 420,
    type: "expense",
  },
];

const spendingBreakdown = [
  { category: "Food", amount: 4500, color: "bg-[#DF6D41]" },
  { category: "Transport", amount: 2200, color: "bg-[#8DA6CC]" },
  { category: "Shopping", amount: 1800, color: "bg-[#AAA648]" },
  { category: "Bills", amount: 1500, color: "bg-[#F7D89A]" },
];

const totalSpending = spendingBreakdown.reduce(
  (total, item) => total + item.amount,
  0
);


const savingsGoals = [
  {
    id: 1,
    title: "New Laptop",
    saved: 24000,
    target: 40000,
    color: "bg-[#DF6D41]",
  },
  {
    id: 2,
    title: "Emergency Fund",
    saved: 15000,
    target: 30000,
    color: "bg-[#AAA648]",
  },
  {
    id: 3,
    title: "Dream Vacation",
    saved: 8000,
    target: 20000,
    color: "bg-[#8DA6CC]",
  },
];



function App() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#342F29] md:flex">
      {/* Sidebar */}
      <aside className="flex w-full flex-col border-r border-[#EAE3D8] bg-[#FFFEFB] p-6 md:min-h-screen md:w-64">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DF6D41] text-white">
            <Wallet size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">
              finora<span className="text-[#DF6D41]">.</span>
            </h1>
            <p className="text-[10px] tracking-widest text-[#92897D]">
              MONEY, IN BALANCE
            </p>
          </div>
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#A0978B]">
          Workspace
        </p>

        <nav className="space-y-2">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                name === "Dashboard"
                  ? "bg-[#DF6D41] text-white"
                  : "text-[#777064] hover:bg-[#F7F0E5]"
              }`}
            >
              <Icon size={19} />
              {name}
            </button>
          ))}
        </nav>

        <div className="mt-auto hidden rounded-2xl bg-[#F7D89A] p-5 md:block">
          <Target size={22} className="mb-3 text-[#8D6B28]" />
          <p className="font-bold text-[#51432B]">
            Small steps add up.
          </p>
          <p className="mt-2 text-sm leading-6 text-[#75664B]">
            Keep your goals close and your money intentional.
          </p>
        </div>

        <button className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#777064] hover:bg-[#F7F0E5]">
          <Settings size={19} />
          Settings
        </button>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 p-6 md:p-10">
        <header className="mb-10">
          <p className="text-sm text-[#92897D]">
            Your personal finance space
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            Welcome to Finora<span className="text-[#DF6D41]">.</span>
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-[#92897D]">
            A calmer, clearer way to understand your money
            and make room for what matters.
          </p>
        </header>
        <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
  <SummaryCard
    title="Available Balance"
    amount="₹42,480"
    description="Your income minus expenses"
    icon={Wallet}
    theme="canyon"
  />

  <SummaryCard
    title="Total Income"
    amount="₹45,000"
    description="Money received"
    icon={TrendingUp}
    theme="olive"
  />

  <SummaryCard
    title="Total Expenses"
    amount="₹2,520"
    description="Money spent"
    icon={TrendingDown}
    theme="sky"
  />
</section>

        <section className="rounded-3xl border border-[#EAE3D8] bg-white p-8 md:p-12">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBE7DE] text-[#C95B34]">
            <Wallet size={28} />
          </div>

          <p className="text-sm font-semibold text-[#92897D]">
            YOUR FINANCIAL JOURNEY STARTS HERE
          </p>

          <h3 className="mt-3 max-w-lg text-2xl font-extrabold md:text-3xl">
            Make every rupee feel a little more intentional.
          </h3>

          <p className="mt-3 max-w-lg leading-7 text-[#92897D]">
            Track your income, understand your spending,
            and build habits that help you reach your goals.
          </p>

          <button className="mt-7 rounded-xl bg-[#DF6D41] px-6 py-3 font-bold text-white transition hover:bg-[#C95B34]">
            Explore your finances
          </button>
        </section>
        <section className="mb-8 rounded-3xl border border-[#EAE3D8] bg-[#FFFEFB] p-6 md:p-8">
  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
    <div>
      <h3 className="text-xl font-extrabold">Recent Transactions</h3>
      <p className="mt-1 text-sm text-[#92897D]">
        Keep track of where your money goes.
      </p>
    </div>

    <button className="rounded-xl bg-[#F7F0E5] px-4 py-2 text-sm font-semibold text-[#342F29] transition hover:bg-[#F7D89A]">
      View all
    </button>
  </div>

  <div className="space-y-2">
    {recentTransactions.map((transaction) => (
      <div
        key={transaction.id}
        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4 transition hover:bg-[#F8F5EF]"
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
              transaction.type === "income"
                ? "bg-[#E9EDD9] text-[#737B37]"
                : "bg-[#F9E5DC] text-[#C65D37]"
            }`}
          >
            {transaction.type === "income" ? (
              <TrendingUp size={20} />
            ) : (
              <ArrowLeftRight size={20} />
            )}
          </div>

          <div>
            <p className="font-bold">{transaction.title}</p>
            <p className="mt-1 text-xs text-[#92897D]">
              {transaction.category} · {transaction.date}
            </p>
          </div>
        </div>

        <p
          className={`font-extrabold ${
            transaction.type === "income"
              ? "text-[#737B37]"
              : "text-[#C65D37]"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}₹
          {transaction.amount.toLocaleString("en-IN")}
        </p>
      </div>
    ))}
  </div>
</section>

<section className="mb-8 rounded-3xl border border-[#EAE3D8] bg-[#FFFEFB] p-6 md:p-8">
  <div className="mb-6">
    <h3 className="text-xl font-extrabold">Monthly Spending</h3>
    <p className="mt-1 text-sm text-[#92897D]">
      See how your expenses are distributed.
    </p>
  </div>

  <div className="mb-8">
    <p className="text-sm text-[#92897D]">Total tracked spending</p>
    <h4 className="mt-2 text-3xl font-extrabold">
      ₹{totalSpending.toLocaleString("en-IN")}
    </h4>
  </div>

  <div className="space-y-5">
    {spendingBreakdown.map((item) => {
      const percentage = (item.amount / totalSpending) * 100;

      return (
        <div key={item.category}>
          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold">{item.category}</span>
            <span className="text-[#777064]">
              ₹{item.amount.toLocaleString("en-IN")} ·{" "}
              {percentage.toFixed(0)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-[#F0EBE2]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${item.color}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    })}
  </div>
</section>

<section className="mb-8 rounded-3xl border border-[#EAE3D8] bg-[#FFFEFB] p-6 md:p-8">
  <div className="mb-6 flex items-center justify-between gap-3">
    <div>
      <h3 className="text-xl font-extrabold">Savings Goals</h3>
      <p className="mt-1 text-sm text-[#92897D]">
        Every little step brings you closer.
      </p>
    </div>
    <Target size={24} className="text-[#DF6D41]" />
  </div>

  <div className="grid gap-5 md:grid-cols-3">
    {savingsGoals.map((goal) => {
      const percentage = Math.min(
        (goal.saved / goal.target) * 100,
        100
      );

      return (
        <div
          key={goal.id}
          className="rounded-2xl border border-[#EAE3D8] p-5"
        >
          <h4 className="font-bold">{goal.title}</h4>

          <p className="mt-4 text-2xl font-extrabold">
            ₹{goal.saved.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-sm text-[#92897D]">
            of ₹{goal.target.toLocaleString("en-IN")}
          </p>

          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#F0EBE2]">
            <div
              className={`h-full rounded-full ${goal.color}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="mt-2 text-right text-xs font-semibold text-[#777064]">
            {percentage.toFixed(0)}% saved
          </p>
        </div>
      );
    })}
  </div>
</section>


        <footer className="mt-8 text-center text-xs text-[#A0978B]">
          Finora · Money, in balance.
        </footer>
      </main>
    </div>
  );
}

export default App;
