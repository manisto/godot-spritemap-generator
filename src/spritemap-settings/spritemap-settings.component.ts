import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

interface TileSettings {
    x: number,
    y: number,
}

@Component({
    selector: "spritemap-settings",
    templateUrl: "./spritemap-settings.html",
})
export class SpritemapSettingsComponent implements AfterViewInit {
    @ViewChild("preview")
    private previewReference: ElementRef<HTMLCanvasElement>;
    private preview: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private spritemap: HTMLImageElement;
    private margin: number;
    private size: number;
    private rows: number;
    private columns: number;
    private settings: TileSettings[];

    fileSelected($event: Event): void {
        let fileInput: HTMLInputElement = $event.target as HTMLInputElement;
        let file = fileInput.files[0];
        let url = URL.createObjectURL(file);
        this.spritemap = new Image();
        
        this.spritemap.addEventListener("loadend", () => {
            URL.revokeObjectURL(url);
            this.initializeSettings();
            this.updatePreview();
        });

        this.spritemap.src = url;
        fileInput.value = null;
    }

    initializeSettings(): void {
        this.rows = (this.spritemap.height + this.margin) / (this.size + this.margin);
        this.columns = (this.spritemap.width + this.margin) / (this.size + this.margin);

        this.settings = [];

        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                this.settings.push({
                    x: column * 17,
                    y: row * 17,
                });
            }
        }

        this.preview.width = this.spritemap.width * 2;
        this.preview.height = this.spritemap.height * 2;

        this.context.strokeStyle = "#F00";
        this.context.scale(2, 2);
        this.context.imageSmoothingEnabled = false;
    }

    updatePreview(): void {
        if (!this.spritemap) {
            return;
        }

        this.context.clearRect(0, 0, this.preview.width, this.preview.height);
        this.context.globalAlpha = 1;
        this.context.drawImage(this.spritemap, 0, 0);
        this.context.globalAlpha = .5;
        
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                let x = column * (this.size + this.margin);
                let y = row * (this.size + this.margin);
                this.context.strokeRect(x + .5, y + .5, this.size - 1, this.size - 1);
            }
        }
    }

    ngAfterViewInit(): void {
        this.preview = this.previewReference.nativeElement;
        this.context = this.preview.getContext("2d");
    }
}