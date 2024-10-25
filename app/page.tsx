"use client";

import { useState, useEffect } from "react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  RotateCcw,
  RotateCw,
  Pencil,
  Eraser,
  User,
  Save,
  Trophy,
  BarChart3,
  Lightbulb,
  Timer,
} from "lucide-react";

const DIFFICULTY_LEVELS = [
  { value: "super-easy", label: "Super Easy", initialNumbers: "35-40" },
  { value: "easy", label: "Easy", initialNumbers: "30-34" },
  { value: "intermediate", label: "Intermediate", initialNumbers: "25-29" },
  { value: "hard", label: "Hard", initialNumbers: "20-24" },
  { value: "super-hard", label: "Super Hard", initialNumbers: "17-19" },
];

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("super-easy");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-[#F8F8FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          ナンプレAI生成サイト
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Difficulty Selection */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">難易度設定</h2>
            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
              options={DIFFICULTY_LEVELS}
            />
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsRunning(true)}
            >
              新しいパズルを生成
            </Button>
          </Card>

          {/* Timer */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">タイマー</h2>
            <div className="text-4xl font-mono text-center">{formatTime(time)}</div>
            <Button
              variant="outline"
              size="icon"
              className="mx-auto block"
              onClick={() => setIsRunning(!isRunning)}
            >
              <Timer className="h-6 w-6" />
            </Button>
          </Card>

          {/* Progress */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">進捗</h2>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-lg">{progress}% 完了</p>
          </Card>
        </div>

        {/* Sudoku Grid */}
        <Card className="p-6">
          <div className="grid grid-cols-9 gap-0.5 max-w-2xl mx-auto">
            {Array(81).fill(null).map((_, index) => (
              <div
                key={index}
                className={`
                  aspect-square border border-gray-300 flex items-center justify-center text-xl font-semibold
                  ${index % 9 === 2 || index % 9 === 5 ? "border-r-2 border-r-gray-400" : ""}
                  ${Math.floor(index / 9) === 2 || Math.floor(index / 9) === 5 ? "border-b-2 border-b-gray-400" : ""}
                `}
              />
            ))}
          </div>
        </Card>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Number Pad */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">操作パネル</h2>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  className="aspect-square text-xl font-semibold"
                >
                  {num}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <Button variant="outline" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Eraser className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Hint System */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">ヒント</h2>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                <Lightbulb className="h-4 w-4 mr-2" />
                候補数字を表示
              </Button>
              <Button className="w-full" variant="outline">
                次の一手をアドバイス
              </Button>
            </div>
          </Card>

          {/* User Features */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">ユーザー機能</h2>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                <User className="h-4 w-4 mr-2" />
                プロフィール
              </Button>
              <Button className="w-full" variant="outline">
                <Save className="h-4 w-4 mr-2" />
                進捗を保存
              </Button>
              <Button className="w-full" variant="outline">
                <Trophy className="h-4 w-4 mr-2" />
                実績
              </Button>
              <Button className="w-full" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                詳細統計
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}