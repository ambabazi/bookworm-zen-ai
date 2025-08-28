import { BookCard } from "@/components/BookCard";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Star, TrendingUp, Heart, ShoppingCart } from "lucide-react";
import book1 from "@/assets/book1.jpg";
import book2 from "@/assets/book2.jpg";
import book3 from "@/assets/book3.jpg";
import book4 from "@/assets/book4.jpg";

const Index = () => {
  const featuredBooks = [
    {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      image: book1,
      price: 12.99,
      originalPrice: 16.99,
      discount: 24,
      rating: 4.5,
      category: "Fiction"
    },
    {
      id: "2",
      title: "Project Hail Mary",
      author: "Andy Weir",
      image: book2,
      price: 14.99,
      originalPrice: 18.99,
      discount: 21,
      rating: 4.8,
      category: "Sci-Fi"
    },
    {
      id: "3",
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      image: book3,
      price: 11.99,
      originalPrice: 15.99,
      discount: 25,
      rating: 4.6,
      category: "Romance"
    },
    {
      id: "4",
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      image: book4,
      price: 13.99,
      rating: 4.3,
      category: "Mystery"
    }
  ];

  const bestSellers = [
    {
      id: "5",
      title: "Atomic Habits",
      author: "James Clear",
      image: book1,
      price: 13.99,
      originalPrice: 17.99,
      discount: 22,
      rating: 4.7,
      category: "Self-Help"
    },
    {
      id: "6",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      image: book2,
      price: 12.49,
      originalPrice: 16.99,
      discount: 26,
      rating: 4.4,
      category: "Thriller"
    },
    {
      id: "7",
      title: "Educated",
      author: "Tara Westover",
      image: book3,
      price: 14.99,
      originalPrice: 19.99,
      discount: 25,
      rating: 4.5,
      category: "Memoir"
    },
    {
      id: "8",
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      image: book4,
      price: 13.99,
      rating: 4.2,
      category: "Fantasy"
    }
  ];

  const categories = [
    "Fiction", "Non-Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", 
    "Biography", "Self-Help", "History", "Science", "Art", "Business"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">BookHaven</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-6 text-sm">
                <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Categories</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Best Sellers</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-primary mb-6 leading-tight">
            Discover Your Next
            <span className="block text-accent">Great Read</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore thousands of books across all genres. From bestsellers to hidden gems, 
            find the perfect book for every moment of your reading journey.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for books, authors, or genres..." 
                className="pl-12 pr-4 py-3 text-lg h-14 bg-card/50 backdrop-blur-sm border-border/50"
              />
              <Button className="absolute right-2 top-2 h-10">
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.slice(0, 6).map((category) => (
              <Badge 
                key={category} 
                variant="secondary" 
                className="hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button size="lg" className="gap-2">
              <TrendingUp className="h-5 w-5" />
              Explore Best Sellers
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Star className="h-5 w-5" />
              New Arrivals
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-primary">Featured Books</h3>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-primary flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-accent" />
                Best Sellers
              </h3>
              <p className="text-muted-foreground mt-2">Most popular books this month</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-primary text-center mb-8">
            Browse by Category
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-16 text-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-accent">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-accent-foreground mb-4">
            Stay Updated
          </h3>
          <p className="text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new releases, 
            exclusive discounts, and reading recommendations.
          </p>
          
          <div className="max-w-md mx-auto flex gap-2">
            <Input 
              placeholder="Enter your email" 
              className="bg-card/50 backdrop-blur-sm border-accent-foreground/20"
            />
            <Button className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <h4 className="text-xl font-bold">BookHaven</h4>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Your trusted online bookstore for discovering amazing reads 
                across all genres and interests.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Fiction</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Non-Fiction</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">New Arrivals</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Customer Service</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 BookHaven. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Index;