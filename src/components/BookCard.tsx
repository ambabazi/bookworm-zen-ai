import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  category: string;
}

export function BookCard({
  title,
  author,
  image,
  price,
  originalPrice,
  discount,
  rating,
  category
}: BookCardProps) {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-semibold">
              -{discount}%
            </Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <Badge variant="outline" className="text-xs mb-2">
              {category}
            </Badge>
            <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{author}</p>
          </div>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < Math.floor(rating) ? "text-accent" : "text-muted"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({rating})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button size="sm" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}